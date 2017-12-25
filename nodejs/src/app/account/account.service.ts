import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Account } from './account';

@Injectable()
export class AccountService {
  constructor(private http: HttpClient) { }

  private readonly path = '/api/data/account/';

  get(): Promise<Account[]> {
    return new Promise((resolve) => {
      this.http
        .get(this.path + 'get')
        .toPromise()
        .then((data) => resolve(data as Account[]))
        .catch((error) => console.error(error.message));
    });
  }

  save(account: Account): Promise<Account> {
    return this.http.post<Account>(this.path + 'save', account).toPromise();
  }

  update(account: Account): Promise<object> {
    return this.http.post<Account>(this.path + 'update', account).toPromise();
  }
}
