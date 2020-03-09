import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { get, set } from 'idb-keyval';
import { Long } from 'protobufjs';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from '../../utils/http.service';
import { Account, Category, Currency, Dump, FamilyMember, Settings, SubCategory, Transaction, TransactionTemplate } from '../model/model';
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
        return this.http.get('/api/data/dump/get?ts=' + modifiedAfter);
      })
      .then(data => {
        this.dump = this.enricher.merge(this.dump, Dump.decode(data));
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

  saveAccount(account: Account): Promise<Account> {
    return this.http.post('/api/data/account/save', Account.encode(account))
      .then(data => Account.decode(data))
      .then(newAccount => {
        this.dump.accounts.push(newAccount);
        this.updateCache();
        return newAccount;
      });
  }

  saveCategory(category: Category): Promise<Category> {
    return this.http.post('/api/data/category/save', Category.encode(category))
      .then(data => Category.decode(data))
      .then(newCategory => {
        this.dump.categories.push(newCategory);
        this.updateCache();
        return newCategory;
      });
  }

  saveSubCategory(subCategory: SubCategory): Promise<SubCategory> {
    return this.http.post('/api/data/sub_category/save', SubCategory.encode(subCategory))
      .then(data => SubCategory.decode(data))
      .then(newSubCategory => {
        this.dump.subCategories.push(newSubCategory);
        this.updateCache();
        return newSubCategory;
      });
  }

  saveFamilyMember(familyMember: FamilyMember): Promise<FamilyMember> {
    return this.http.post('/api/data/family_member/save', FamilyMember.encode(familyMember))
      .then(data => FamilyMember.decode(data))
      .then(newFamilyMember => {
        this.dump.familyMembers.push(newFamilyMember);
        this.updateCache();
        return newFamilyMember;
      });
  }

  saveTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.post('/api/data/transaction/save', Transaction.encode(transaction))
      .then(data => Transaction.decode(data))
      .then(newTransaction => {
        this.dump.transactions.push(newTransaction);
        this.enricher.enrich(this.dump);
        this.updateCache();
        return newTransaction;
      });
  }

  saveTransactionTemplate(transactionTemplate: TransactionTemplate): Promise<TransactionTemplate> {
    return this.http.post('/api/data/transaction_template/save',
      TransactionTemplate.encode(transactionTemplate))
      .then(data => TransactionTemplate.decode(data))
      .then(newTransactionTemplate => {
        this.dump.transactionTemplates.push(newTransactionTemplate);
        this.enricher.enrich(this.dump);
        this.updateCache();
        return newTransactionTemplate;
      });
  }

  updateSettings(settings: Settings): Promise<any> {
    this.setDefaultLang();
    return this.http.post('/api/data/settings/update', Settings.encode(settings))
      .then(() => {
        this.dump.settings = settings;
        this.updateCache();
      });
  }

  updateAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/update', Account.encode(account))
      .then(() => {
        this.dump.accounts = this.dump.accounts.filter(x => x.id != account.id);
        this.dump.accounts.push(account);
        this.updateCache();
      });
  }

  updateCategory(category: Category): Promise<any> {
    return this.http.post('/api/data/category/update', Category.encode(category))
      .then(() => {
        this.dump.categories = this.dump.categories.filter(x => x.id != category.id);
        this.dump.categories.push(category);
        this.updateCache();
      });
  }

  updateSubCategory(subCategory: SubCategory): Promise<any> {
    return this.http.post('/api/data/sub_category/update', SubCategory.encode(subCategory))
      .then(() => {
        this.dump.subCategories = this.dump.subCategories.filter(x => x.id != subCategory.id);
        this.dump.subCategories.push(subCategory);
        this.updateCache();
      });
  }

  updateFamilyMember(familyMember: FamilyMember): Promise<any> {
    return this.http.post('/api/data/family_member/update', FamilyMember.encode(familyMember))
      .then(() => {
        this.dump.familyMembers = this.dump.familyMembers.filter(x => x.id != familyMember.id);
        this.dump.familyMembers.push(familyMember);
        this.updateCache();
      });
  }

  updateTransaction(transaction: Transaction): Promise<any> {
    return this.http.post('/api/data/transaction/update', Transaction.encode(transaction))
      .then(() => {
        this.dump.transactions = this.dump.transactions.filter(x => x.id != transaction.id);
        this.dump.transactions.push(transaction);
        this.enricher.enrich(this.dump);
        this.updateCache();
      });
  }

  updateTransactionTemplate(transactionTemplate: TransactionTemplate): Promise<any> {
    return this.http.post('/api/data/transaction_template/update',
      TransactionTemplate.encode(transactionTemplate))
      .then(() => {
        this.dump.transactionTemplates = this.dump.transactionTemplates
          .filter(x => x.id != transactionTemplate.id);
        this.dump.transactionTemplates.push(transactionTemplate);
        this.enricher.enrich(this.dump);
        this.updateCache();
      });
  }

  private updateCache(): void {
    set('dump', this.dump.toJSON()).catch(error => console.error(error));
  }
}
