import { Pipe, PipeTransform } from '@angular/core';
import { Account, Security } from '../core/model/model';
import { UserDataService } from '../core/user-data/user-data.service';

@Pipe({
  name: 'currencySymbol'
})
export class CurrencySymbolPipe implements PipeTransform {
  constructor(private userdata: UserDataService) {}

  // net entity
  transform(value: Account | Security | number | string, type?: string): string {
    if (value == 0 && type) {
      return '';
    } else if (value instanceof Account || value instanceof Security) {
      return this.userdata.findCurrency(value.currencyId).symbol;
    } else if (typeof value == 'number' && type == 'account') {
      return this.userdata.findCurrency(this.userdata.findAccount(value).currencyId).symbol;
    } else if (typeof value == 'number' && type == 'security') {
      return this.userdata.findCurrency(this.userdata.findSecurity(value).currencyId).symbol;
    } else if (typeof value == 'string') {
      return this.userdata.findCurrency(this.userdata.settings().currencyId).symbol;
    } else {
      throw Error(`unable to transform value=${value}, type=${type}`);
    }
  }
}
