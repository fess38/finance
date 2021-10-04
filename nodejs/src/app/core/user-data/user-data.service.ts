import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { del, get, set } from 'idb-keyval';
import { Long } from 'protobufjs';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from '../../utils/http.service';
import {
  Account, AppMode, Category, Currency, DataStorage, FamilyMember, IdHolder, LocalSettings, Note, Notepad, Security,
  SecurityTransaction, Settings, SubCategory, Transaction, TransactionTemplate
} from '../model/model';
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
  private ds = new DataStorage();
  private isReadOnly_ = true;
  localSettings = new LocalSettings();

  subscribeOnInit(callback): Subscription {
    return this.isInit.subscribe(() => callback());
  }

  isReadOnly(): boolean {
    return this.isReadOnly_;
  }

  readCache(): void {
    get('storage').then(dataStorage => {
      if (dataStorage) {
        this.ds = this.enricher.merge(this.ds, DataStorage.fromObject(dataStorage));
        this.setInit();
      }
    });
  }

  refresh(catchCallback = () => {}): void {
    get('ts')
      .then(ts => {
        const modifiedAfter = (ts as number - 3600 * 1000) || 0;
        return this.http.get('/api/data/storage/get?ts=' + modifiedAfter, 30000);
      })
      .then(data => {
        const newDataStorage = DataStorage.decode(data);
        this.ds = this.enricher.merge(this.ds, newDataStorage);
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
    this.enricher.enrich(this.ds);
    this.isInit.next(true);
    this.isInit.complete();
    this.setDefaultLang();
  }

  private setDefaultLang() {
    if (this.translate) {
      this.translate.setDefaultLang('ru');
      this.translate.use(this.locale());
      this.setTitle();
    }
  }

  dataStorageJson(): any {
    let result = new DataStorage(this.ds);
    result.currencies = [];
    result.settings = null;
    result.idHolder = null;
    return DataStorage.toObject(result);
  }

  locale(): string {
    return Language[this.settings().language].toLowerCase();
  }

  set appMode(appMode: AppMode) {
    this.localSettings.appMode = appMode;
    this.setTitle();
  }

  private setTitle() {
    let key = ''
    if (this.localSettings.appMode == AppMode.FINANCE) {
      key = 'main_page.finance';
    } else if (this.localSettings.appMode == AppMode.NOTES) {
      key = 'main_page.notes';
    }
    this.translate.get(key).subscribe(x => this.titleService.setTitle(x));
  }

  settings(): Settings {
    return this.ds.settings as Settings || new Settings({ language: Language.RU });
  }

  currencies(): Currency[] {
    return this.ds.currencies as Currency[];
  }

  accounts(): Account[] {
    return this.ds.accounts.filter(x => !x.isDeleted) as Account[];
  }

  categories(): Category[] {
    return this.ds.categories.filter(x => !x.isDeleted) as Category[];
  }

  subCategories(): SubCategory[] {
    return this.ds.subCategories.filter(x => !x.isDeleted) as SubCategory[];
  }

  familyMembers(): FamilyMember[] {
    return this.ds.familyMembers.filter(x => !x.isDeleted) as FamilyMember[];
  }

  transactions(): Transaction[] {
    return this.allTransactions().filter(x => !x.isDeleted);
  }

  allTransactions(): Transaction[] {
    return this.ds.transactions as Transaction[];
  }

  transactionTemplates(): TransactionTemplate[] {
    return this.ds.transactionTemplates.filter(x => !x.isDeleted) as TransactionTemplate[];
  }

  securities(): Security[] {
    return this.ds.securities.filter(x => !x.isDeleted) as Security[];
  }

  securityTransactions(): SecurityTransaction[] {
    return this.ds.securityTransactions.filter(x => !x.isDeleted) as SecurityTransaction[];
  }

  notepads(): Notepad[] {
    return this.ds.notepads.filter(x => !x.isDeleted) as Notepad[];
  }

  notes(): Note[] {
    return this.ds.notes.filter(x => !x.isDeleted) as Note[];
  }

  // new entity

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

  findSecurity(id: number | Long): Security {
    return this.securities().filter(x => x.id == id)[0];
  }

  findSecurityTransaction(id: number | Long): SecurityTransaction {
    return this.securityTransactions().filter(x => x.id == id)[0];
  }

  findNotepad(id: number | Long): Notepad {
    return this.notepads().filter(x => x.id == id)[0];
  }

  findNote(id: number | Long): Note {
    return this.notes().filter(x => x.id == id)[0];
  }

  // new entity

  private isObsoleteIdHolder(): boolean {
    return !this.ds.idHolder || this.ds.idHolder.from > this.ds.idHolder.to;
  }

  async nextId(): Promise<number> {
    if (this.isObsoleteIdHolder()) {
      await this.nextIds(null);
    }
    return this.ds.idHolder.from++;
  }

  private async nextIds(idsAmount?: number): Promise<any> {
    const url = '/api/data/next_id' + (idsAmount ? '?amount=' + idsAmount : '');
    await this.http.get(url, 30000).then(data => {
      const newIdHolder = IdHolder.decode(data);
      if (this.isObsoleteIdHolder()) {
        this.ds.idHolder = newIdHolder;
      } else {
        this.ds.idHolder.to = newIdHolder.to;
      }
    });
  }

  async saveDataStorage(ds: DataStorage): Promise<any> {
    const nextIdSync = () => {
      if (this.isObsoleteIdHolder()) {
        throw new Error('ids out of range');
      }
      return this.ds.idHolder.from++;
    };

    const idsAmount = ds.accounts.length + ds.categories.length + ds.subCategories.length
      + ds.familyMembers.length + ds.transactions.length + ds.transactionTemplates.length
      + ds.securities.length + ds.securityTransactions.length + ds.notepads.length
      + ds.notes.length;
    // new entity
    await this.nextIds(idsAmount);

    ds.accounts.forEach(account => {
      const oldId = account.id;
      account.id = nextIdSync();
      ds.transactions.forEach(transaction => {
        if (transaction.accountIdFrom == oldId) {
          transaction.accountIdFrom = account.id;
        }
        if (transaction.accountIdTo == oldId) {
          transaction.accountIdTo = account.id;
        }
      });
      ds.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.accountIdFrom == oldId) {
          transactionTemplate.transaction.accountIdFrom = account.id;
        }
        if (transactionTemplate.transaction.accountIdTo == oldId) {
          transactionTemplate.transaction.accountIdTo = account.id;
        }
      });
    });

    ds.categories.forEach(category => {
      const oldId = category.id;
      category.id = nextIdSync();
      ds.subCategories.forEach(subCategory => {
        if (subCategory.categoryId == oldId) {
          subCategory.categoryId = category.id;
        }
      });
      ds.transactions.forEach(transaction => {
        if (transaction.categoryId == oldId) {
          transaction.categoryId = category.id;
        }
      });
      ds.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.categoryId == oldId) {
          transactionTemplate.transaction.categoryId = category.id;
        }
      });
    });

    ds.subCategories.forEach(subCategory => {
      const oldId = subCategory.id;
      subCategory.id = nextIdSync();
      ds.transactions.forEach(transaction => {
        if (transaction.subCategoryId == oldId) {
          transaction.subCategoryId = subCategory.id;
        }
      });
      ds.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.subCategoryId == oldId) {
          transactionTemplate.transaction.subCategoryId = subCategory.id;
        }
      });
    });

    ds.familyMembers.forEach(familyMember => {
      const oldId = familyMember.id;
      familyMember.id = nextIdSync();
      ds.transactions.forEach(transaction => {
        if (transaction.familyMemberId == oldId) {
          transaction.familyMemberId = familyMember.id;
        }
      });
      ds.transactionTemplates.forEach(transactionTemplate => {
        if (transactionTemplate.transaction.familyMemberId == oldId) {
          transactionTemplate.transaction.familyMemberId = familyMember.id;
        }
      });
    });

    ds.transactions.forEach(transaction => {
      transaction.id = nextIdSync();
    });

    ds.transactionTemplates.forEach(transactionTemplate => {
      transactionTemplate.id = nextIdSync();
    });

    ds.securities.forEach(security => {
      const oldId = security.id;
      security.id = nextIdSync();
      ds.securityTransactions.forEach(securityTransaction => {
        if (securityTransaction.securityId == oldId) {
          securityTransaction.securityId = security.id;
        }
      });
    });

    ds.securityTransactions.forEach(securityTransaction => {
      securityTransaction.id = nextIdSync();
    });

    ds.notepads.forEach(notepad => {
      const oldId = notepad.id;
      notepad.id = nextIdSync();
      ds.notes.forEach(note => {
        if (note.notepadId == oldId) {
          note.notepadId = notepad.id;
        }
      });
    });

    ds.notes.forEach(note => {
      note.id = nextIdSync();
    });

    // new entity

    await this.http.post('/api/data/storage/save', DataStorage.encode(ds), 600000);
    await this.refresh();
  }

  async saveAccount(account: Account): Promise<any> {
    await this.nextId().then(id => account.id = id);
    await this.http.post('/api/data/account/save', Account.encode(account));
    this.ds.accounts.push(account);
    this.updateCache();
  }

  async saveCategory(category: Category): Promise<any> {
    await this.nextId().then(id => category.id = id);
    await this.http.post('/api/data/category/save', Category.encode(category));
    this.ds.categories.push(category);
    this.updateCache();
  }

  async saveSubCategory(subCategory: SubCategory): Promise<any> {
    await this.nextId().then(id => subCategory.id = id);
    await this.http.post('/api/data/sub_category/save', SubCategory.encode(subCategory));
    this.ds.subCategories.push(subCategory);
    this.updateCache();
  }

  async saveFamilyMember(familyMember: FamilyMember): Promise<any> {
    await this.nextId().then(id => familyMember.id = id);
    await this.http.post('/api/data/family_member/save', FamilyMember.encode(familyMember));
    this.ds.familyMembers.push(familyMember);
    this.updateCache();
  }

  async saveTransaction(transaction: Transaction): Promise<any> {
    await this.nextId().then(id => transaction.id = id);
    await this.http.post('/api/data/transaction/save', Transaction.encode(transaction));
    this.ds.transactions.push(transaction);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async saveTransactionTemplate(transactionTemplate: TransactionTemplate): Promise<any> {
    await this.nextId().then(id => transactionTemplate.id = id);
    await this.http.post('/api/data/transaction_template/save', TransactionTemplate.encode(transactionTemplate));
    this.ds.transactionTemplates.push(transactionTemplate);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async saveSecurity(security: Security): Promise<any> {
    await this.nextId().then(id => security.id = id);
    await this.http.post('/api/data/security/save', Security.encode(security));
    this.ds.securities.push(security);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async saveSecurityTransaction(securityTransaction: SecurityTransaction): Promise<any> {
    await this.nextId().then(id => securityTransaction.id = id);
    await this.http.post('/api/data/security_transaction/save', SecurityTransaction.encode(securityTransaction));
    this.ds.securityTransactions.push(securityTransaction);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async saveNotepad(notepad: Notepad): Promise<any> {
    await this.nextId().then(id => notepad.id = id);
    await this.http.post('/api/data/notepad/save', Notepad.encode(notepad));
    this.ds.notepads.push(notepad);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async saveNote(note: Note): Promise<any> {
    await this.nextId().then(id => note.id = id);
    await this.http.post('/api/data/note/save', Note.encode(note));
    this.ds.notes.push(note);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  // new entity

  async updateSettings(settings: Settings): Promise<any> {
    this.setDefaultLang();
    await this.http.post('/api/data/settings/update', Settings.encode(settings));
    this.ds.settings = settings;
    this.updateCache();
  }

  async updateAccount(account: Account): Promise<any> {
    await this.http.post('/api/data/account/update', Account.encode(account));
    this.ds.accounts = this.ds.accounts.filter(x => x.id != account.id);
    this.ds.accounts.push(account);
    this.updateCache();
  }

  async updateCategory(category: Category): Promise<any> {
    await this.http.post('/api/data/category/update', Category.encode(category));
    this.ds.categories = this.ds.categories.filter(x => x.id != category.id);
    this.ds.categories.push(category);
    this.updateCache();
  }

  async updateSubCategory(subCategory: SubCategory): Promise<any> {
    await this.http.post('/api/data/sub_category/update', SubCategory.encode(subCategory));
    this.ds.subCategories = this.ds.subCategories.filter(x => x.id != subCategory.id);
    this.ds.subCategories.push(subCategory);
    this.updateCache();
  }

  async updateFamilyMember(familyMember: FamilyMember): Promise<any> {
    await this.http.post('/api/data/family_member/update', FamilyMember.encode(familyMember));
    this.ds.familyMembers = this.ds.familyMembers.filter(x => x.id != familyMember.id);
    this.ds.familyMembers.push(familyMember);
    this.updateCache();
  }

  async updateTransaction(transaction: Transaction): Promise<any> {
    await this.http.post('/api/data/transaction/update', Transaction.encode(transaction));
    this.ds.transactions = this.ds.transactions.filter(x => x.id != transaction.id);
    this.ds.transactions.push(transaction);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async updateTransactionTemplate(transactionTemplate: TransactionTemplate): Promise<any> {
    await this.http.post('/api/data/transaction_template/update', TransactionTemplate.encode(transactionTemplate));
    this.ds.transactionTemplates = this.ds.transactionTemplates.filter(x => x.id != transactionTemplate.id);
    this.ds.transactionTemplates.push(transactionTemplate);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async updateSecurity(security: Security): Promise<any> {
    await this.http.post('/api/data/security/update', Security.encode(security));
    this.ds.securities = this.ds.securities.filter(x => x.id != security.id);
    this.ds.securities.push(security);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async updateSecurityTransaction(securityTransaction: SecurityTransaction): Promise<any> {
    await this.http.post('/api/data/security_transaction/update', SecurityTransaction.encode(securityTransaction));
    this.ds.securityTransactions = this.ds.securityTransactions.filter(x => x.id != securityTransaction.id);
    this.ds.securityTransactions.push(securityTransaction);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async updateNotepad(notepad: Notepad): Promise<any> {
    await this.http.post('/api/data/notepad/update', Notepad.encode(notepad));
    this.ds.notepads = this.ds.notepads.filter(x => x.id != notepad.id);
    this.ds.notepads.push(notepad);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  async updateNote(note: Note): Promise<any> {
    await this.http.post('/api/data/note/update', Note.encode(note));
    this.ds.notes = this.ds.notes.filter(x => x.id != note.id);
    this.ds.notes.push(note);
    this.enricher.enrich(this.ds);
    this.updateCache();
  }

  // new entity

  async deleteDataStorage(): Promise<any> {
    await this.http.post('/api/data/storage/delete', Settings.encode(new Settings()), 600000);
    this.ds = new DataStorage();
    await del('ts');
    await this.refresh();
  }

  private updateCache(): void {
    set('storage', this.ds.toJSON()).catch(error => console.error(error));
  }
}
