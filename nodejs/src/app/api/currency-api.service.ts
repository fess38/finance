import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Currency } from '../model/currency';

@Injectable()
export class CurrencyApiService {
  constructor(private http: HttpClient) { }

  private _values: Currency[] = [];

  values(): Promise<Currency[]> {
    return new Promise((resolve, reject) => {
      if (this._values.length >= 0) {
        this.http
          .get('/api/currency/get',)
          .toPromise()
          .then((data) => {
            this._values = data as Currency[];
            resolve(this._values);
          });
      } else {
        resolve(this._values);
      }
    });
  }
}
