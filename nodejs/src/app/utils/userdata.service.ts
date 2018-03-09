import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { Account, Currency, Dump } from '../model';
import { google } from '../wrappers';
import { HttpService } from './http.service';
import BoolValue = google.protobuf.BoolValue;

@Injectable()
export class UserdataService {
  constructor(private http: HttpService) {
    setTimeout(() => this.update(), 10000);
  }

  private idb: AngularIndexedDB = new AngularIndexedDB('finance', 1);

  private db(): Promise<AngularIndexedDB> {
    let callback = (event) => {
      let params = { keyPath: 'id', autoIncrement: false };
      event.currentTarget.result.createObjectStore('account', params);
      event.currentTarget.result.createObjectStore('currency', params);
    };
    return this.idb.openDatabase(1, callback)
      .then(() => this.idb);
  }

  private update() {
    this.http.get('/api/data/dump/get')
      .then(data => this.updateUserData(Dump.decode(data)))
      .catch(error => console.error(error.message));
  }

  private updateUserData(dump: Dump) {
    this.db().then(db => {
      dump.accounts.forEach(account => db.update('account', account));
      dump.currencies.forEach(currency => db.update('currency', currency));
    });
  }

  deleteUserData() {
    this.db().then(db => {
      db.clear('account');
      db.clear('currency');
    });
  }

  currencies(): Promise<Currency[]> {
    return this.db().then(db => db.getAll('currency') as Promise<Currency[]>);
  }

  accounts(): Promise<Account[]> {
    return this.db().then(db => db.getAll('account') as Promise<Account[]>);
  }

  saveAccount(account: Account) {
    let savedAccount: Account;
    return this.http.post('/api/data/account/save', Account.encode(account))
      .then((data) => {
        savedAccount = Account.decode(data);
        return this.db();
      })
      .then(db => db.update('account', savedAccount));
  }

  updateAccount(account: Account): Promise<BoolValue> {
    return this.http.post('/api/data/account/update', Account.encode(account))
      .then(data => {
        const success = BoolValue.decode(data).value;
        if (success) {
          return this.db();
        } else {
          throw new Error('Can not update account');
        }
      })
      .then(db => db.update('account', account));
  }

  deleteAccount(account: Account): Promise<BoolValue> {
    return this.http.post('/api/data/account/delete', Account.encode(account))
      .then(data => {
        const success = BoolValue.decode(data).value;
        if (success) {
          return this.db();
        } else {
          throw new Error('Can not delete account');
        }
      })
      .then(db => db.delete('account', account.id));
  }
}
