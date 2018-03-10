import { Injectable } from '@angular/core';
import { AngularIndexedDB } from 'angular2-indexeddb';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/toPromise';
import { Account, Currency, Dump } from '../model';
import { HttpService } from './http.service';

@Injectable()
export class UserdataService {
  constructor(private http: HttpService, private cookie: CookieService) {
    setTimeout(() => this.update(), 10000);
  }

  private idb = new AngularIndexedDB('finance', 1);

  private version(): number {
    let version = Number.parseInt(this.cookie.get('idb_version'));
    if (isNaN(version)) {
      version = 1;
      this.cookie.put('idb_version', version.toString());
    }
    return version;
  }

  private db(): Promise<AngularIndexedDB> {
    let callback = (event) => {
      let params = { keyPath: 'id', autoIncrement: false };
      const db: IDBDatabase = event.currentTarget.result;
      if (db.objectStoreNames.contains('account')) {
        db.deleteObjectStore('account');
      }
      if (db.objectStoreNames.contains('currency')) {
        db.deleteObjectStore('currency');
      }
      db.createObjectStore('account');
      db.createObjectStore('currency');
    };
    return this.idb.openDatabase(this.version(), callback).then(() => this.idb);
  }

  private update() {
    this.http.get('/api/data/dump/get')
      .then(data => this.updateUserData(Dump.decode(data)))
      .catch(error => console.error(error));
  }

  private updateUserData(dump: Dump) {
    this.db()
      .then(db => {
        dump.accounts.forEach(account => db.update('account', account, account.id));
        dump.currencies.forEach(currency => db.update('currency', currency, currency.id));
      })
      .catch(error => console.error(error));
  }

  deleteUserData() {
    this.db()
      .then(db => {
        db.clear('account');
        db.clear('currency');
      })
      .catch(error => console.error(error));
    this.cookie.put('idb_version', (this.version() + 1).toString());
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
      .then(db => db.update('account', savedAccount, savedAccount.id));
  }

  updateAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/update', Account.encode(account))
      .then(() => this.db())
      .then(db => db.update('account', account, account.id));
  }

  deleteAccount(account: Account): Promise<any> {
    return this.http.post('/api/data/account/delete', Account.encode(account))
      .then(() => this.db())
      .then(db => db.delete('account', account.id));
  }
}
