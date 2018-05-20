import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { Account, Category, Currency, Dump, FamilyMember, SubCategory, Transaction } from '../model';
import { HttpService } from './http.service';

@Injectable()
export class UserDataService {
  constructor(private http: HttpService) {
    this.refresh(0);
  }

  currencies: Currency[] = [];
  accounts: Account[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  familyMembers: FamilyMember[] = [];
  transactions: Transaction[] = [];

  private refresh(timeout = 5000) {
    setTimeout(() => {
      this.http.get('/api/data/dump/get')
        .then(data => Dump.decode(data))
        .then(dump => {
          this.currencies = dump.currencies as Currency[];
          this.accounts = dump.accounts as Account[];
          this.categories = dump.categories as Category[];
          this.subCategories = dump.subCategories as SubCategory[];
          this.familyMembers = dump.familyMembers as FamilyMember[];
          this.transactions = dump.transactions as Transaction[];
        })
        .catch(error => console.error(error));
    }, timeout);
  }

  saveAccount(account: Account) {
    return this.http.post('/api/data/account/save', Account.encode(account))
      .then((data) => this.accounts.push(Account.decode(data)));
  }

  saveFamilyMember(familyMember: FamilyMember) {
    return this.http.post('/api/data/family_member/save', FamilyMember.encode(familyMember))
      .then((data) => this.familyMembers.push(FamilyMember.decode(data)));
  }

  updateAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/update', Account.encode(account));
  }

  updateFamilyMember(familyMember: FamilyMember): Promise<any> {
    return this.http.post('/api/data/family_member/update', FamilyMember.encode(familyMember));
  }
}
