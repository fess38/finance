import { Pipe, PipeTransform } from '@angular/core';
import { Account, Security } from '../core/model/model';
import { UserDataService } from '../core/user-data/user-data.service';

@Pipe({
  name: 'currencySymbol',
  pure: false
})
export class CurrencySymbolPipe implements PipeTransform {
  constructor(private userdata: UserDataService) {}

  // net entity
  transform(value: Account | Security | number | string, type?: string): string {
    let currencyId: number;
    if (value == 0 && type) {
      currencyId = 0;
    } else if (value instanceof Account || value instanceof Security) {
      currencyId = value.currencyId;
    } else if (typeof value == 'number' && type == 'account') {
      currencyId = this.userdata.findAccount(value).currencyId;
    } else if (typeof value == 'number' && type == 'security') {
      currencyId = this.userdata.findSecurity(value).currencyId;
    } else if (typeof value == 'string') {
      currencyId = this.userdata.settings().currencyId;
    } else {
      throw Error(`unable to transform value=${value}, type=${type}`);
    }
    const currency = this.userdata.findCurrency(currencyId);
    return currency ? currency.symbol : '';
  }
}
