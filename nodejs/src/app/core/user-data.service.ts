import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from './http.service';
import { Account, Category, Currency, Dump, FamilyMember, Settings, SubCategory, Transaction } from './model/model';
import { UserDataEnricherService } from './user-data-enricher.service';
import Language = Settings.Language;

@Injectable()
export class UserDataService {
  private enricher = new UserDataEnricherService();
  private isInit: AsyncSubject<boolean> = new AsyncSubject();
  private dump: Dump;
  settings: Settings = new Settings({ language: Language.RU });
  currencies: Currency[] = [];
  accounts: Account[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  familyMembers: FamilyMember[] = [];
  transactions: Transaction[] = [];

  constructor(private http: HttpService, private translate: TranslateService) {
    this.setDefaultLang();
  }

  subscribeOnInit(callback): Subscription {
    return this.isInit.subscribe(() => callback());
  }

  refresh() {
    this.http.get('/api/data/dump/get')
      .then(data => Dump.decode(data))
      .then(dump => {
        this.dump = dump;
        this.enricher.enrich(this.dump);
        this.settings = this.dump.settings as Settings;
        this.currencies = this.dump.currencies as Currency[];
        this.accounts = this.dump.accounts as Account[];
        this.categories = this.dump.categories as Category[];
        this.subCategories = this.dump.subCategories as SubCategory[];
        this.familyMembers = this.dump.familyMembers as FamilyMember[];
        this.transactions = this.dump.transactions as Transaction[];
        this.isInit.next(true);
        this.isInit.complete();
        this.setDefaultLang();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }

  private setDefaultLang() {
    this.translate.setDefaultLang('ru');
    this.translate.use(Language[this.settings.language].toLowerCase());
  }

  locale(): string {
    return Language[this.settings.language].toLowerCase();
  }

  saveAccount(account: Account): Promise<Account> {
    return this.http.post('/api/data/account/save', Account.encode(account))
      .then(data => Account.decode(data))
      .then(newAccount => {
        this.accounts.push(newAccount);
        return newAccount;
      });
  }

  saveCategory(category: Category): Promise<Category> {
    return this.http.post('/api/data/category/save', Category.encode(category))
      .then(data => Category.decode(data))
      .then(newCategory => {
        this.categories.push(newCategory);
        return newCategory;
      });
  }

  saveSubCategory(subCategory: SubCategory): Promise<SubCategory> {
    return this.http.post('/api/data/sub_category/save', SubCategory.encode(subCategory))
      .then(data => SubCategory.decode(data))
      .then(newSubCategory => {
        this.subCategories.push(newSubCategory);
        return newSubCategory;
      });
  }

  saveFamilyMember(familyMember: FamilyMember): Promise<FamilyMember> {
    return this.http.post('/api/data/family_member/save', FamilyMember.encode(familyMember))
      .then(data => FamilyMember.decode(data))
      .then(newFamilyMember => {
        this.familyMembers.push(newFamilyMember);
        return newFamilyMember;
      });
  }

  saveTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.post('/api/data/transaction/save', Transaction.encode(transaction))
      .then(data => Transaction.decode(data))
      .then(newTransaction => {
        this.transactions.push(newTransaction);
        this.enricher.enrich(this.dump);
        return newTransaction;
      });
  }

  updateSettings(settings: Settings): Promise<any> {
    this.setDefaultLang();
    return this.http.post('/api/data/settings/update', Settings.encode(settings));
  }

  updateAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/update', Account.encode(account));
  }

  updateCategory(category: Category): Promise<any> {
    return this.http.post('/api/data/category/update', Category.encode(category));
  }

  updateSubCategory(subCategory: SubCategory): Promise<any> {
    return this.http.post('/api/data/sub_category/update', SubCategory.encode(subCategory));
  }

  updateFamilyMember(familyMember: FamilyMember): Promise<any> {
    return this.http.post('/api/data/family_member/update', FamilyMember.encode(familyMember));
  }

  updateTransaction(transaction: Transaction): Promise<any> {
    return this.http.post('/api/data/transaction/update', Transaction.encode(transaction))
      .then(() => this.enricher.enrich(this.dump));
  }
}
