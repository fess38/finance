import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Currency } from './currency';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) { }

  values(): Promise<Currency[]> {
    return new Promise((resolve) => {
      this.http
        .get('/api/data/currency')
        .toPromise()
        .then((data) => resolve(data as Currency[]));
    });
  }
}
