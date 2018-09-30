import { Component } from '@angular/core';
import * as _ from 'underscore';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'account-list.component.html'
})
export class AccountListComponent {
  constructor(private userdata: UserDataService) {}

  accounts() {
    return _.chain(this.userdata.accounts)
      .filter(x => !x.isDeleted)
      .sortBy(x => x.name.toLowerCase())
      .value();
  }

  currencySymbol(currencyId: number): String {
    let symbol: String;
    if (this.currencies().length > 0) {
      symbol = this.currencies()
        .filter(x => x.id == currencyId)
        .map(x => x.symbol)[0];
    }
    if (symbol == null) {
      symbol = '';
    }
    return symbol;
  }

  private currencies() {
    return this.userdata.currencies;
  }
}
