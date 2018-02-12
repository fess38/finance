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
    this.idb.openDatabase(1, (event) => {
      let params = { keyPath: 'id', autoIncrement: false };
      event.currentTarget.result.createObjectStore('account', params);
      event.currentTarget.result.createObjectStore('currency', params);
    });

    setInterval(() => this.update(), 10000);
  }

  private idb: AngularIndexedDB = new AngularIndexedDB('finance', 1);

  private db(): Promise<AngularIndexedDB> {
    return this.idb.openDatabase(1).then(() => this.idb);
  }

  private update() {
    this.http.get('/api/data/user/get')
      .timeout(5000)
      .toPromise()
      .then(data => this.updateUserData(data))
      .catch(error => console.error(error.message));
  }

  private updateUserData(data) {
    this.db()
      .then(db => db.clear('account'))
      .then(() => this.db())
      .then(db => {
        (data['accounts'] as Account[]).forEach(account => db.add('account', account));
      });
    this.db()
      .then(db => db.clear('currency'))
      .then(() => this.db())
      .then(db => {
        (data['currencies'] as Currency[]).forEach(currency => db.add('currency', currency));
      });
  }

  currencies(): Promise<Currency[]> {
    return this.db()
      .then(db => db.getAll('currency'))
      .then(data => data as Currency[]);
  }

  saveAccount(account: Account): Promise<Account> {
    return this.http.post<Account>('/api/data/account/save', account).toPromise();
  }

  updateAccount(account: Account): Promise<object> {
    return this.http.post<Account>('/api/data/account/update', account).toPromise();
  }

  accounts(): Promise<Account[]> {
    return this.db()
      .then(db => db.getAll('account'))
      .then(data => data as Account[]);
  }
}
