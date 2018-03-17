import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { Account, Currency, Dump } from '../model';
import { HttpService } from './http.service';

@Injectable()
export class UserdataService {
  constructor(private http: HttpService) {
    this.refresh(0);
  }

  accounts: Account[] = [];
  currencies: Currency[] = [];

  private refresh(timeout = 5000) {
    setTimeout(() => {
      this.http.get('/api/data/dump/get')
        .then(data => Dump.decode(data))
        .then(dump => {
          this.accounts = dump.accounts as Account[];
          this.currencies = dump.currencies as Currency[];
        })
        .catch(error => console.error(error));
    }, timeout);
  }

  saveAccount(account: Account) {
    return this.http.post('/api/data/account/save', Account.encode(account))
      .then((data) => this.accounts.push(Account.decode(data)));
  }

  updateAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/update', Account.encode(account));
  }

  deleteAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/delete', Account.encode(account))
      .then(() => this.accounts = this.accounts.filter(x => x.id != account.id));
  }
}
