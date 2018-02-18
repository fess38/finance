import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';
import 'rxjs/add/operator/toPromise';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/timeout';
import { Account } from '../account/account';
import { Currency } from '../account/currency';

@Injectable()
export class UserdataService {
  constructor(private http: HttpClient) {
    setInterval(() => this.update(), 30000);
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
    this.http.get('/api/data/user/get')
      .timeout(5000)
      .toPromise()
      .then(data => this.updateUserData(data))
      .catch(error => console.error(error.message));
  }

  private updateUserData(data) {
    this.db().then(db => {
      (data['accounts'] as Account[]).forEach(account => db.update('account', account));
      (data['currencies'] as Currency[]).forEach(currency => db.update('currency', currency));
    });
  }

  currencies(): Promise<Currency[]> {
    return this.db()
      .then(db => db.getAll('currency'))
      .then(data => data as Currency[]);
  }

  saveAccount(account: Account): Promise<any> {
    let savedAccount: Account;
    return this.http.post<Account>('/api/data/account/save', account)
      .toPromise()
      .then((account) => {
        savedAccount = account;
        return this.db();
      })
      .then(db => db.update('account', savedAccount));
  }

  updateAccount(account: Account): Promise<object> {
    return this.http.post<Account>('/api/data/account/update', account)
      .toPromise()
      .then(() => this.db())
      .then(db => db.update('account', account));
  }

  deleteAccount(account: Account): Promise<object> {
    return this.http.post<Account>('/api/data/account/delete', account)
      .toPromise()
      .then(() => this.db())
      .then(db => db.delete('account', account.id));
  }

  accounts(): Promise<Account[]> {
    return this.db()
      .then(db => db.getAll('account'))
      .then(data => data as Account[]);
  }
}
