import { Component } from '@angular/core';
import * as _ from 'underscore';
import { Account, Currency } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'account-list.component.html'
})
export class AccountListComponent {
  constructor(private userdata: UserDataService) {}

  accounts(): Account[] {
    return _.chain(this.userdata.accounts())
      .filter(x => !x.isDeleted)
      .sortBy(x => x.name.toLowerCase())
      .value();
  }

  locale(): string {
    return this.userdata.locale();
  }

  currencySymbol(account: Account): String {
    return this.userdata.findCurrency(account.currencyId).symbol;
  }

  private currencies(): Currency[] {
    return this.userdata.currencies();
  }
}
