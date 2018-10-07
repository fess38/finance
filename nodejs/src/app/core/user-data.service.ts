import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from './http.service';
import { Account, Category, Currency, Dump, FamilyMember, Settings, SubCategory, Transaction } from './model/model';
import Language = Settings.Language;

@Injectable()
export class UserDataService {
  private isInit: AsyncSubject<boolean> = new AsyncSubject();
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

  refresh(timeout = 1000) {
    this.http.get('/api/data/dump/get')
      .then(data => Dump.decode(data))
      .then(dump => {
        this.settings = dump.settings as Settings;
        this.currencies = dump.currencies as Currency[];
        this.accounts = dump.accounts as Account[];
        this.categories = dump.categories as Category[];
        this.subCategories = dump.subCategories as SubCategory[];
        this.familyMembers = dump.familyMembers as FamilyMember[];
        this.transactions = dump.transactions as Transaction[];
        this.isInit.next(true);
        this.isInit.complete();
        this.setDefaultLang();
      })
      .catch((error) => {
        console.error(error.message);
        setTimeout(() => this.refresh(timeout + 1000));
      });
  }

  private setDefaultLang() {
    this.translate.setDefaultLang('ru');
    this.translate.use(Language[this.settings.language].toLowerCase());
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
}
