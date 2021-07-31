import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { del, get, set } from 'idb-keyval';
import { Long } from 'protobufjs';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from '../../utils/http.service';
import { Account, Category, Currency, Dump, FamilyMember, IdHolder, Settings, SubCategory, TextHolder, Transaction, TransactionTemplate } from '../model/model';
import { UserDataEnricherService } from './user-data-enricher.service';
import Language = Settings.Language;

@Injectable()
export class UserDataService {
  constructor(private http: HttpService,
              private translate: TranslateService,
              private titleService: Title) {
    this.setDefaultLang();
  }

  private enricher = new UserDataEnricherService();
  private isInit = new AsyncSubject<boolean>();
  private dump = new Dump();
  private isReadOnly_: boolean = true;

  subscribeOnInit(callback): Subscription {
    return this.isInit.subscribe(() => callback());
  }

  isReadOnly(): boolean {
    return this.isReadOnly_;
  }

  readCache(): void {
    get('dump').then(dump => {
      if (dump) {
        this.dump = this.enricher.merge(this.dump, Dump.fromObject(dump));
        this.setInit();
      }
    });
  }

  refresh(catchCallback = () => {}): void {
    get('ts')
      .then(ts => {
        const modifiedAfter = (ts as number - 3600 * 1000) || 0;
        return this.http.get('/api/data/dump/get?ts=' + modifiedAfter, 30000);
      })
      .then(data => {
        const newDump = Dump.decode(data);
        this.dump = this.enricher.merge(this.dump, newDump);
        this.updateCache();
        this.setInit();
        this.isReadOnly_ = false;
        set('ts', new Date().getTime());
      })
      .catch(error => {
        console.error(error.message);
        catchCallback();
      });
  }

  private setInit(): void {
    this.enricher.enrich(this.dump);
    this.isInit.next(true);
    this.isInit.complete();
    this.setDefaultLang();
  }

  private setDefaultLang() {
    this.translate.setDefaultLang('ru');
    this.translate.use(Language[this.settings().language].toLowerCase());
    this.translate.get('common.title').subscribe(x => {
      this.titleService.setTitle(x);
    });
  }

  jsonDump(): any {
    let result = new Dump(this.dump);
    result.currencies = [];
    result.settings = null;
    result.idHolder = null;
    return Dump.toObject(result);
  }

  locale(): string {
    return this.language().toLowerCase();
  }

  language(): string {
    return Language[this.settings().language];
  }

  settings(): Settings {
    return this.dump.settings as Settings || new Settings({ language: Language.RU });
  }

  currencies(): Currency[] {
    return this.dump.currencies as Currency[];
  }

  accounts(): Account[] {
    return this.dump.accounts.filter(x => !x.isDeleted) as Account[];
  }

  categories(): Category[] {
    return this.dump.categories.filter(x => !x.isDeleted) as Category[];
  }

  subCategories(): SubCategory[] {
    return this.dump.subCategories.filter(x => !x.isDeleted) as SubCategory[];
  }

  familyMembers(): FamilyMember[] {
    return this.dump.familyMembers.filter(x => !x.isDeleted) as FamilyMember[];
  }

  transactions(): Transaction[] {
    return this.allTransactions().filter(x => !x.isDeleted);
  }

  allTransactions(): Transaction[] {
    return this.dump.transactions as Transaction[];
  }

  transactionTemplates(): TransactionTemplate[] {
    return this.dump.transactionTemplates.filter(x => !x.isDeleted) as TransactionTemplate[];
  }

  findCurrency(id: number | Long): Currency {
    return this.currencies().filter(x => x.id == id)[0];
  }

  findAccount(id: number | Long): Account {
    return this.accounts().filter(x => x.id == id)[0];
  }

  findCategory(id: number | Long): Category {
    return this.categories().filter(x => x.id == id)[0];
  }

  findSubCategory(id: number | Long): SubCategory {
    return this.subCategories().filter(x => x.id == id)[0];
  }

  findFamilyMember(id: number | Long): FamilyMember {
    return this.familyMembers().filter(x => x.id == id)[0];
  }

  findTranasction(id: number | Long): Transaction {
    return this.transactions().filter(x => x.id == id)[0];
  }

  findTranasctionTemplate(id: number | Long): TransactionTemplate {
    return this.transactionTemplates().filter(x => x.id == id)[0];
  }

  private isObsoleteIdHolder(): boolean {
    return !this.dump.idHolder || this.dump.idHolder.from > this.dump.idHolder.to;
  }

  async nextId(): Promise<number> {
    if (this.isObsoleteIdHolder()) {
      await this.nextIds(null);
    }
    return this.dump.idHolder.from++;
  }

  private async nextIds(idsAmount?: number): Promise<any> {
    const url = '/api/data/next_id' + (idsAmount ? '?amount=' + idsAmount : '');
    await this.http.get(url, 30000).then(data => {
      const newIdHolder = IdHolder.decode(data);
      if (this.isObsoleteIdHolder()) {
        this.dump.idHolder = newIdHolder;
      } else {
        this.dump.idHolder.to = newIdHolder.to;
      }
    });
  }

  async saveDump(dump: Dump): Promise<any> {
    const nextIdSync = () => {
      if (this.isObsoleteIdHolder()) {
        throw new Error('ids out of range');
      }
      return this.dump.idHolder.from++;
    };

    const idsAmount = dump.accounts.length + dump.categories.length + dump.subCategories.length
      + dump.familyMembers.length + dump.transactions.length + dump.transactionTemplates.length;
    await this.nextIds(idsAmount);

    dump.accounts.forEach(account => {
      const oldId = account.id;
      account.id = nextIdSync();
      dump.transactions.forEach(transaction => {
        if (transaction.accountIdFrom == oldId) {
          transaction.accountIdFrom = account.id;
        }
        if (transaction.accountIdTo == oldId) {
          transaction.accountIdTo = account.id;
        }
      });
      dump.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.accountIdFrom == oldId) {
          transactionTemplate.transaction.accountIdFrom = account.id;
        }
        if (transactionTemplate.transaction.accountIdTo == oldId) {
          transactionTemplate.transaction.accountIdTo = account.id;
        }
      });
    });

    dump.categories.forEach(category => {
      const oldId = category.id;
      category.id = nextIdSync();
      dump.subCategories.forEach(subCategory => {
        if (subCategory.categoryId == oldId) {
          subCategory.categoryId = category.id;
        }
      });
      dump.transactions.forEach(transaction => {
        if (transaction.categoryId == oldId) {
          transaction.categoryId = category.id;
        }
      });
      dump.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.categoryId == oldId) {
          transactionTemplate.transaction.categoryId = category.id;
        }
      });
    });

    dump.subCategories.forEach(subCategory => {
      const oldId = subCategory.id;
      subCategory.id = nextIdSync();
      dump.transactions.forEach(transaction => {
        if (transaction.subCategoryId == oldId) {
          transaction.subCategoryId = subCategory.id;
        }
      });
      dump.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.subCategoryId == oldId) {
          transactionTemplate.transaction.subCategoryId = subCategory.id;
        }
      });
    });

    dump.familyMembers.forEach(familyMember => {
      const oldId = familyMember.id;
      familyMember.id = nextIdSync();
      dump.transactions.forEach(transaction => {
        if (transaction.familyMemberId == oldId) {
          transaction.familyMemberId = familyMember.id;
        }
      });
      dump.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.familyMemberId == oldId) {
          transactionTemplate.transaction.familyMemberId = familyMember.id;
        }
      });
    });

    dump.transactions.forEach(transaction => {
      transaction.id = nextIdSync();
    });

    dump.transactionTemplates.forEach(transactionTemplate => {
      transactionTemplate.id = nextIdSync();
    });

    // new entity

    await this.http.post('/api/data/dump/save', Dump.encode(dump), 600000);
    await this.refresh();
  }

  async saveAccount(account: Account): Promise<any> {
    await this.nextId().then(id => account.id = id);
    await this.http.post('/api/data/account/save', Account.encode(account));
    this.dump.accounts.push(account);
    this.updateCache();
  }

  async saveCategory(category: Category): Promise<any> {
    await this.nextId().then(id => category.id = id);
    await this.http.post('/api/data/category/save', Category.encode(category));
    this.dump.categories.push(category);
    this.updateCache();
  }

  async saveSubCategory(subCategory: SubCategory): Promise<any> {
    await this.nextId().then(id => subCategory.id = id);
    await this.http.post('/api/data/sub_category/save', SubCategory.encode(subCategory));
    this.dump.subCategories.push(subCategory);
    this.updateCache();
  }

  async saveFamilyMember(familyMember: FamilyMember): Promise<any> {
    await this.nextId().then(id => familyMember.id = id);
    await this.http.post('/api/data/family_member/save', FamilyMember.encode(familyMember));
    this.dump.familyMembers.push(familyMember);
    this.updateCache();
  }

  async saveTransaction(transaction: Transaction): Promise<any> {
    await this.nextId().then(id => transaction.id = id);
    await this.http.post('/api/data/transaction/save', Transaction.encode(transaction));
    this.dump.transactions.push(transaction);
    this.enricher.enrich(this.dump);
    this.updateCache();
  }

  async saveTransactionTemplate(transactionTemplate: TransactionTemplate): Promise<any> {
    await this.nextId().then(id => transactionTemplate.id = id);
    await this.http.post('/api/data/transaction_template/save', TransactionTemplate.encode(transactionTemplate));
    this.dump.transactionTemplates.push(transactionTemplate);
    this.enricher.enrich(this.dump);
    this.updateCache();
  }

  async updateSettings(settings: Settings): Promise<any> {
    this.setDefaultLang();
    await this.http.post('/api/data/settings/update', Settings.encode(settings));
    this.dump.settings = settings;
    this.updateCache();
  }

  async updateAccount(account: Account): Promise<any> {
    await this.http.post('/api/data/account/update', Account.encode(account));
    this.dump.accounts = this.dump.accounts.filter(x => x.id != account.id);
    this.dump.accounts.push(account);
    this.updateCache();
  }

  async updateCategory(category: Category): Promise<any> {
    await this.http.post('/api/data/category/update', Category.encode(category));
    this.dump.categories = this.dump.categories.filter(x => x.id != category.id);
    this.dump.categories.push(category);
    this.updateCache();
  }

  async updateSubCategory(subCategory: SubCategory): Promise<any> {
    await this.http.post('/api/data/sub_category/update', SubCategory.encode(subCategory));
    this.dump.subCategories = this.dump.subCategories.filter(x => x.id != subCategory.id);
    this.dump.subCategories.push(subCategory);
    this.updateCache();
  }

  async updateFamilyMember(familyMember: FamilyMember): Promise<any> {
    await this.http.post('/api/data/family_member/update', FamilyMember.encode(familyMember));
    this.dump.familyMembers = this.dump.familyMembers.filter(x => x.id != familyMember.id);
    this.dump.familyMembers.push(familyMember);
    this.updateCache();
  }

  async updateTransaction(transaction: Transaction): Promise<any> {
    await this.http.post('/api/data/transaction/update', Transaction.encode(transaction));
    this.dump.transactions = this.dump.transactions.filter(x => x.id != transaction.id);
    this.dump.transactions.push(transaction);
    this.enricher.enrich(this.dump);
    this.updateCache();
  }

  async updateTransactionTemplate(transactionTemplate: TransactionTemplate): Promise<any> {
    await this.http.post('/api/data/transaction_template/update', TransactionTemplate.encode(transactionTemplate));
    this.dump.transactionTemplates = this.dump.transactionTemplates.filter(x => x.id != transactionTemplate.id);
    this.dump.transactionTemplates.push(transactionTemplate);
    this.enricher.enrich(this.dump);
    this.updateCache();
  }

  async deleteDump(): Promise<any> {
    await this.http.post('/api/data/dump/delete', TextHolder.encode(new TextHolder()), 600000);
    this.dump = new Dump();
    await del('ts');
    await this.refresh();
  }

  private updateCache(): void {
    set('dump', this.dump.toJSON()).catch(error => console.error(error));
  }
}
