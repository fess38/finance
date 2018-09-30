import { Injectable } from '@angular/core';
import { AsyncSubject, Subscription } from 'rxjs';
import { HttpService } from './http.service';
import { Account, Category, Currency, Dump, FamilyMember, Settings, SubCategory, Transaction } from './model/model';

@Injectable()
export class UserDataService {
  private isInit: AsyncSubject<boolean> = new AsyncSubject();
  settings: Settings = new Settings();
  currencies: Currency[] = [];
  accounts: Account[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  familyMembers: FamilyMember[] = [];
  transactions: Transaction[] = [];

  constructor(private http: HttpService) {
    this.refresh(0);
  }

  private refresh(timeout = 5000) {
    setTimeout(() => {
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
        })
        .catch(error => console.error(error));
    }, timeout);
  }

  subscribeOnInit(callback): Subscription {
    return this.isInit.subscribe(() => callback());
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
