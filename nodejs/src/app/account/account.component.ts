import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { UserdataService } from '../utils/userdata.service';
import { Account } from './account';
import { Currency } from './currency';

@Component({
  templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
  constructor(private userdataService: UserdataService,
              private alertService: AlertService) { }

  currencies: Currency[] = [];
  accounts: Account[] = [];
  isEditing: boolean = false;
  newAccount: Account = new Account();

  ngOnInit() {
    this.userdataService.currencies()
      .then(currencies => this.currencies = currencies)
      .catch(error => console.error(error));

    this.userdataService.accounts()
      .then(accounts => this.accounts = accounts)
      .catch(error => console.error(error));
    this.stopEdit();
  }

  save(account: Account) {
    this.userdataService.saveAccount(account)
      .then(() => {
        this.ngOnInit();
      })
      .catch(error => {
        this.alertService.error('Ошибка сохранения');
        console.error(error.message);
      });
  }

  update(account: Account) {
    if (account.id != 0) {
      this.userdataService.updateAccount(account)
        .then(() => {
          this.ngOnInit();
        })
        .catch(error => {
          this.alertService.error('Ошибка сохранения');
          console.error(error.message);
        });
    }
  }

  delete(account: Account) {
    this.userdataService.deleteAccount(account)
      .then(() => {
        this.ngOnInit();
      })
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
    if (this.currencies.length > 0) {
      symbol = this.currencies
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

