import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, Currency, Settings, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';
import { TransactionUtilsService } from '../../transaction/transaction-utils.service';
import Language = Settings.Language;

@Component({
  templateUrl: 'account-detail.component.html'
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  account: Account = new Account();
  updatedBalance: number = undefined;
  private subscription: Subscription;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedAccount = this.userdata.accounts.filter(x => x.id == +id)[0];
        if (navigatedAccount == null) {
          this.router.navigate(['/account']);
        } else {
          this.account = navigatedAccount;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  currencies(): Currency[] {
    return this.userdata.currencies;
  }

  private language(): string {
    return Language[this.userdata.settings.language];
  }

  update(account: Account) {
    if (account.id == 0) {
      this.userdata.saveAccount(account)
        .then(newAccount => {
          this.router.navigate(['/account/' + newAccount.id]);
          this.account = newAccount;
        })
        .catch(error => console.error(error.message));
    } else {
      if (this.updatedBalance != undefined && account.balance != this.updatedBalance) {
        const transaction = this.createAccountBalanceCorrection(account, this.updatedBalance);
        this.userdata.saveTransaction(transaction).catch(error => console.error(error.message));
      }
      this.userdata.updateAccount(account)
        .then(() => this.router.navigate(['/account']))
        .catch(error => console.error(error.message));
    }
  }

  createAccountBalanceCorrection(account: Account, updatedBalance: number): Transaction {
    const transaction: Transaction = new Transaction({
      created: TransactionUtilsService.currentDate(),
      accountIdFrom: account.id,
      amountFrom: 0,
      accountIdTo: account.id,
      amountTo: 0,
      categoryId: -1
    });
    if (account.balance > updatedBalance) {
      transaction.amountFrom = Number(account.balance) - updatedBalance;
    } else {
      transaction.amountTo = updatedBalance - Number(account.balance);
    }
    return transaction;
  }

  delete(account: Account) {
    account.isDeleted = true;
    this.update(account);
    this.router.navigate(['/account']);
  }

  isNewAccount() {
    return this.account.id == 0;
  }

  hasTransations() {
    return this.account.transactionAmount > 0;
  }

  isValidForm() {
    return this.account.name.length > 0 && this.account.currencyId != 0;
  }
}
