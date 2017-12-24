import { Component, OnInit } from '@angular/core';
import { AccountService } from './account.service';
import { CurrencyService } from './currency.service';
import { Currency } from './currency';
import { Account } from './account';

@Component({
  templateUrl: 'account.component.html'
})
export class AccountComponent implements OnInit {
  constructor(private currencyService: CurrencyService,
              private accountService: AccountService) { }

  private currencies: Currency[] = [];
  private accounts: Account[] = [];
  private isEditing: boolean = false;
  private newAccount = {};

  ngOnInit() {
    this.currencyService.values()
      .then(currencies => this.currencies = currencies)
      .catch(error => console.error(error));

    this.accountService.get()
      .then(accounts => this.accounts = accounts)
      .catch(error => console.error(error));
  }

  save(account: Account) {
    this.accountService.save(account)
      .then(savedAccount => {
        this.accounts.push(savedAccount);
        this.stopEdit();
      })
      .catch(error => console.error(error));
  }

  update(account: Account) {
    this.accountService.update(account)
      .then(() => this.stopEdit())
      .catch(error => console.error(error));
  }

  startEdit(account: Account) {
    this.newAccount = account;
    this.isEditing = true;
  }

  stopEdit() {
    this.newAccount = {};
    this.isEditing = false;
  }

  isAccountAdding(): boolean {
    return !this.newAccount['id'];
  }
}

