import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppMode, Money, Security, SecurityTransaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AlertService } from '../../utils/alert/alert.service';
import { DateUtils } from '../../utils/date-utils';
import { SecurityUtils } from '../security-utils';
import Type = SecurityTransaction.Type;

@Component({
  templateUrl: 'security-transaction-detail.component.html'
})
export class SecurityTransactionDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  securityTransaction = new SecurityTransaction();
  valueToMoney = (value) => SecurityUtils.valueToMoney(value);

  ngOnInit() {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedSecurityTransaction = this.userdata.findSecurityTransaction(+id);
        if (navigatedSecurityTransaction == null) {
          this.router.navigate(['/security_transaction']);
        } else {
          this.securityTransaction = navigatedSecurityTransaction;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      this.securityTransaction.date = DateUtils.formatDate();
      this.securityTransaction.exchangeRate = new Money({ units: 1 });
      this.securityTransaction.purchaseFee = new Money({ units: 0 });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  securities(): Security[] {
    return this.userdata.securities()
      .filter(x => x.isVisible)
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  typesWithLabels(): any[] {
    return SecurityUtils.typesWithLabels;
  }

  priceLabel(): string {
    if (this.securityTransaction.type == Type.COUPON || this.securityTransaction.type == Type.DIVIDENDS) {
      return 'security_transaction.sum';
    } else {
      return 'common.price';
    }
  }

  isShowExchangeRate(): boolean {
    if (this.securityTransaction.securityId == 0) {
      return false;
    }
    const security = this.userdata.findSecurity(this.securityTransaction.securityId);
    return security.currencyId != this.userdata.settings().currencyId;
  }

  isShowAmount(): boolean {
    return this.securityTransaction.type == Type.BUY || this.securityTransaction.type == Type.SELL;
  }

  isValidForm(): boolean {
    return this.securityTransaction.date.length > 0
      && this.securityTransaction.securityId > 0
      && this.securityTransaction.type > 0
      && this.securityTransaction.price
      && (this.securityTransaction.price.units > 0 || this.securityTransaction.price.micros > 0)
      && this.securityTransaction.exchangeRate
      && (this.securityTransaction.exchangeRate.units > 0 || this.securityTransaction.exchangeRate.micros > 0)
      && this.securityTransaction.amount > 0
      && this.securityTransaction.purchaseFee
      && (this.securityTransaction.purchaseFee.units >= 0 || this.securityTransaction.purchaseFee.micros >= 0);
  }

  update(securityTransaction: SecurityTransaction): void {
    if (this.userdata.findSecurity(securityTransaction.securityId).currencyId == this.userdata.settings().currencyId) {
      this.securityTransaction.exchangeRate = new Money({ units: 1 });
    }

    if (securityTransaction.id == 0) {
      this.userdata.saveSecurityTransaction(securityTransaction)
        .then(() => this.router.navigate(['/security_transaction/' + securityTransaction.id]))
        .catch(error => {
          this.alertService.error('error.save');
          console.error(error.message);
        });
    } else {
      this.userdata.updateSecurityTransaction(securityTransaction)
        .then(() => this.router.navigate(['/security_transaction']))
        .catch(error => {
          this.alertService.error(securityTransaction.isDeleted ? 'error.delete' : 'error.update');
          securityTransaction.isDeleted = false;
          console.error(error.message);
        });
    }
  }

  delete(securityTransaction: SecurityTransaction): void {
    securityTransaction.isDeleted = true;
    this.update(securityTransaction);
  }
}
