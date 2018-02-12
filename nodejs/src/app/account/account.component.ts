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
  }

  save(account: Account) {
    this.userdataService.saveAccount(account)
      .then(savedAccount => {
        this.accounts.push(savedAccount);
        this.stopEdit();
      })
      .catch(error => {
        this.alertService.error('Ошибка сохранения');
        this.stopEdit();
        console.error(error.message);
      });
  }

  update(account: Account) {
    this.userdataService.updateAccount(account)
      .then(() => this.stopEdit())
      .catch(error => {
        this.alertService.error('Ошибка сохранения');
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

  findCurrency(currencyId: number): Currency {
    let currency: Currency = new Currency();
    if (this.currencies.length > 0) {
      currency = this.currencies.filter(x => x.id == currencyId)[0];
    }
    return currency;
  }
}

