import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../core/model/model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'account-detail.component.html'
})
export class AccountDetailComponent implements OnInit {
  account: Account = new Account();

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const navigatedAccount = this.userdata.accounts.filter(x => x.id == +id)[0];
      if (navigatedAccount == null) {
        this.router.navigate(['/account/new']);
      } else {
        this.account = navigatedAccount;
      }
    }
  }

  currencies() {
    return this.userdata.currencies;
  }

  update(account: Account) {
    let promise: Promise<any>;
    if (account.id == 0) {
      promise = this.userdata.saveAccount(account);
    } else {
      promise = this.userdata.updateAccount(account);
    }
    promise
      .then(() => this.router.navigate(['/account']))
      .catch(error => {
        console.error(error.message);
      });
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
