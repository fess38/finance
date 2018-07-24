import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { Account } from '../../model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'account-detail.component.html'
})
export class AccountDetailComponent implements OnInit {
  account: Account = new Account();

  constructor(private userdata: UserDataService,
              private alertService: AlertService,
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
    if (account.id == 0) {
      this.userdata.saveAccount(account)
        .then(() => this.router.navigate(['/account']))
        .catch(error => {
          this.alertService.error('Ошибка сохранения');
          console.error(error.message);
        });
    } else {
      this.userdata.updateAccount(account)
        .then(() => this.router.navigate(['/account']))
        .catch(error => {
          this.alertService.error('Ошибка обновления');
          console.error(error.message);
        });
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

  hasCurrency() {
    return this.account.currencyId != 0;
  }

  hasTransations() {
    return this.account.transactionAmount > 0;
  }
}
