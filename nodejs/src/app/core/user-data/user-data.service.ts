import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { get, set } from 'idb-keyval';
import { Long } from 'protobufjs';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from '../../utils/http.service';
import { Account, Category, Currency, Dump, FamilyMember, Settings, SubCategory, Transaction } from '../model/model';
import { UserDataEnricherService } from './user-data-enricher.service';
import Language = Settings.Language;

@Injectable()
export class UserDataService {
  private enricher = new UserDataEnricherService();
  private isInit: AsyncSubject<boolean> = new AsyncSubject();
  private dump: Dump = new Dump();

  constructor(private http: HttpService,
              private translate: TranslateService,
              private titleService: Title) {
    this.setDefaultLang();
  }

  subscribeOnInit(callback): Subscription {
    return this.isInit.subscribe(() => callback());
  }

  readCache(): void {
    get('dump').then(dump => {
      if (dump) {
        this.dump = this.enricher.merge(this.dump, Dump.fromObject(dump));
        this.init();
      }
    });
  }

  refresh(catchCallback = () => {}): void {
    get('ts')
      .then(ts => {
        const modifiedAfter = (ts as number - 7 * 86400 * 1000) || 0;
        return this.http.get('/api/data/dump/get?ts=' + modifiedAfter);
      })
      .then(data => Dump.decode(data))
      .then(data => {
        return data;
      })
      .then(dump => {
        this.dump = this.enricher.merge(this.dump, dump);
        this.init();
        this.updateCache();
        set('ts', new Date().getTime());
      })
      .catch(error => {
        console.error(error.message);
        catchCallback();
      });
  }

  private init(): void {
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
    return this.dump.accounts as Account[];
  }

  categories(): Category[] {
    return this.dump.categories as Category[];
  }

  subCategories(): SubCategory[] {
    return this.dump.subCategories as SubCategory[];
  }

  familyMembers(): FamilyMember[] {
    return this.dump.familyMembers as FamilyMember[];
  }

  transactions(): Transaction[] {
    return this.dump.transactions.filter(x => !x.isDeleted) as Transaction[];
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

  findTransaction(id: number | Long): Transaction {
    return this.transactions().filter(x => x.id == id)[0];
  }

  saveAccount(account: Account): Promise<Account> {
    return this.http.post('/api/data/account/save', Account.encode(account))
      .then(data => Account.decode(data))
      .then(newAccount => {
        this.accounts().push(newAccount);
        this.updateCache();
        return newAccount;
      });
  }

  saveCategory(category: Category): Promise<Category> {
    return this.http.post('/api/data/category/save', Category.encode(category))
      .then(data => Category.decode(data))
      .then(newCategory => {
        this.categories().push(newCategory);
        this.updateCache();
        return newCategory;
      });
  }

  saveSubCategory(subCategory: SubCategory): Promise<SubCategory> {
    return this.http.post('/api/data/sub_category/save', SubCategory.encode(subCategory))
      .then(data => SubCategory.decode(data))
      .then(newSubCategory => {
        this.subCategories().push(newSubCategory);
        this.updateCache();
        return newSubCategory;
      });
  }

  saveFamilyMember(familyMember: FamilyMember): Promise<FamilyMember> {
    return this.http.post('/api/data/family_member/save', FamilyMember.encode(familyMember))
      .then(data => FamilyMember.decode(data))
      .then(newFamilyMember => {
        this.familyMembers().push(newFamilyMember);
        this.updateCache();
        return newFamilyMember;
      });
  }

  saveTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.post('/api/data/transaction/save', Transaction.encode(transaction))
      .then(data => Transaction.decode(data))
      .then(newTransaction => {
        this.transactions().push(newTransaction);
        this.enricher.enrich(this.dump);
        this.updateCache();
        return newTransaction;
      });
  }

  updateSettings(settings: Settings): Promise<any> {
    this.setDefaultLang();
    return this.http.post('/api/data/settings/update', Settings.encode(settings))
      .then(() => this.updateCache());
  }

  updateAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/update', Account.encode(account))
      .then(() => this.updateCache());
  }

  updateCategory(category: Category): Promise<any> {
    return this.http.post('/api/data/category/update', Category.encode(category))
      .then(() => this.updateCache());
  }

  updateSubCategory(subCategory: SubCategory): Promise<any> {
    return this.http.post('/api/data/sub_category/update', SubCategory.encode(subCategory))
      .then(() => this.updateCache());
  }

  updateFamilyMember(familyMember: FamilyMember): Promise<any> {
    return this.http.post('/api/data/family_member/update', FamilyMember.encode(familyMember))
      .then(() => this.updateCache());
  }

  updateTransaction(transaction: Transaction): Promise<any> {
    return this.http.post('/api/data/transaction/update', Transaction.encode(transaction))
      .then(() => {
        this.enricher.enrich(this.dump);
        this.updateCache();
      });
  }

  private updateCache(): void {
    set('dump', this.dump.toJSON()).catch(error => console.error(error));
  }
}
