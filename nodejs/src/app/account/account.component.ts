import { Component } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { Account } from '../model';
import { UserDataService } from '../utils/user-data.service';

@Component({
  templateUrl: 'account.component.html'
})
export class AccountComponent {
  constructor(private userdata: UserDataService,
              private alertService: AlertService) {
  }

  isEditing: boolean = false;
  newAccount: Account = new Account();

  accounts() {
    return this.userdata.accounts.sort((a: Account, b: Account) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  }

  currencies() {
    return this.userdata.currencies;
  };

  save(account: Account) {
    this.userdata.saveAccount(account)
      .then(() => this.stopEdit())
      .catch(error => {
        this.alertService.error('Ошибка сохранения');
        console.error(error.message);
      });
  }

  update(account: Account) {
    if (account.id != 0) {
      this.userdata.updateAccount(account)
        .then(() => this.stopEdit())
        .catch(error => {
          this.alertService.error('Ошибка обновления');
          console.error(error.message);
        });
    }
  }

  delete(account: Account) {
    this.userdata.deleteAccount(account)
      .then(() => this.stopEdit())
      .catch(error => {
        this.alertService.error('Ошибка удаления');
        console.error(error.message);
      });
  }

  startEdit(account: Account) {
    this.newAccount = account;
    this.isEditing = true;
  }

  stopEdit() {
    this.newAccount = new Account();
    this.isEditing = false;
  }

  isAccountAdding(): boolean {
    return !this.newAccount['id'];
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

  hasTransactions(account: Account): boolean {
    return account.transactionAmount > 0;
  }
}

