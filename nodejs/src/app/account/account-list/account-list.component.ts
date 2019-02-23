import { Component } from '@angular/core';
import { Long } from 'protobufjs';
import * as _ from 'underscore';
import { Account } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';
import { NumberFormatter } from '../../utils/number_formatter';

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

  formatBalance(account: Account): string {
    return NumberFormatter.format(account.balance || 0) + this.currencySymbol(account.currencyId);
  }

  private currencySymbol(currencyId: number | Long): String {
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
