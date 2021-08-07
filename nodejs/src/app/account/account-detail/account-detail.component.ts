import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, Currency, Settings, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import Language = Settings.Language;

@Component({
  templateUrl: 'account-detail.component.html'
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  account = new Account();
  updatedBalance: number = undefined;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedAccount = this.userdata.accounts().filter(x => x.id == +id)[0];
        if (navigatedAccount == null) {
          this.router.navigate(['/account']);
        } else {
          this.account = navigatedAccount;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isReadOnly(): boolean {
    return this.userdata.isReadOnly();
  }

  currencies(): Currency[] {
    return this.userdata.currencies();
  }

  language(): string {
    return Language[this.userdata.settings().language];
  }

  update(account: Account): void {
    if (account.id == 0) {
      this.userdata.saveAccount(account)
        .then(() => this.router.navigate(['/account/' + account.id]))
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      if (this.updatedBalance != undefined && account.balance != this.updatedBalance) {
        const transaction = this.createAccountBalanceCorrection(account, this.updatedBalance);
        this.userdata.saveTransaction(transaction).catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
      }
      this.userdata.updateAccount(account)
        .then(() => this.router.navigate(['/account']))
        .catch(error => {
          account.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  createAccountBalanceCorrection(account: Account, updatedBalance: number): Transaction {
    const transaction = new Transaction({
      created: DateUtils.formatDate(),
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

  delete(account: Account): void {
    account.isDeleted = true;
    this.update(account);
  }

  hasTransations(): boolean {
    return this.account.transactionAmount > 0;
  }

  isValidForm(): boolean {
    return this.account.name.length > 0 && this.account.currencyId != 0;
  }

  viewTransactions(account: Account): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        account_id: account.id,
        source: `account/${account.id}`
      }
    });
  }
}
