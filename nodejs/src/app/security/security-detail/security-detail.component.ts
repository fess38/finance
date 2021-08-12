import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency, Money, Security } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { SecurityUtils } from '../security-utils';

@Component({
  templateUrl: 'security-detail.component.html'
})
export class SecurityDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  security = new Security();
  valueToMoney = (value) => SecurityUtils.valueToMoney(value);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedSecurity = this.userdata.securities().filter(x => x.id == +id)[0];
        if (navigatedSecurity == null) {
          this.router.navigate(['/security']);
        } else {
          this.security = navigatedSecurity;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      this.security.exchangeRate = new Money({ units: 1 });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  currencies(): Currency[] {
    return this.userdata.currencies();
  }

  isDifferentCurrency(): boolean {
    return this.security.currencyId > 0 && this.security.currencyId != this.userdata.settings().currencyId;
  }

  update(security: Security): void {
    if (security.id == 0) {
      this.updateSecuritiesExchangeRate(security)
        .then(() => this.userdata.saveSecurity(security))
        .then(() => this.router.navigate(['/security/' + security.id]))
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.updateSecuritiesExchangeRate(security)
        .then(() => this.userdata.updateSecurity(security))
        .then(() => this.router.navigate(['/security']))
        .catch(error => {
          security.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  private async updateSecuritiesExchangeRate(updatedSecurity: Security): Promise<any> {
    if (updatedSecurity.currencyId == this.userdata.settings().currencyId) {
      return;
    }
    for (let security of this.userdata.securities()) {
      if (updatedSecurity.currencyId == security.currencyId && updatedSecurity.id != security.id) {
        security.exchangeRate = updatedSecurity.exchangeRate;
        await this.userdata.updateSecurity(security);
      }
    }
  }

  delete(security: Security): void {
    security.isDeleted = true;
    this.update(security);
  }

  hasTransations(): boolean {
    return this.security.transactionAmount > 0;
  }

  isValidForm(): boolean {
    return this.security.name.length > 0
      && this.security.currencyId != 0
      && this.security.price
      && this.security.price.units > 0
      && this.security.price.micros >= 0
      && this.security.exchangeRate
      && (this.security.exchangeRate.units > 0 || this.security.exchangeRate.micros > 0);
  }
}
