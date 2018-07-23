import { Component } from '@angular/core';
import { Account } from '../../model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'account-list.component.html'
})
export class AccountListComponent {
  constructor(private userdata: UserDataService) {}

  accounts() {
    return this.userdata.accounts
      .filter(x => !x.isDeleted)
      .sort(AccountListComponent.sortByName());
  }

  private static sortByName() {
    return (a: Account, b: Account) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    };
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
