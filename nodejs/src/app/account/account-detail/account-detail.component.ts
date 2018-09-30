import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';

@Component({
  templateUrl: 'account-detail.component.html'
})
export class AccountDetailComponent implements OnInit, OnDestroy {
  account: Account = new Account();
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

  currencies() {
    return this.userdata.currencies;
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
      this.userdata.updateAccount(account)
        .then(() => this.router.navigate(['/account']))
        .catch(error => console.error(error.message));
    }
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
