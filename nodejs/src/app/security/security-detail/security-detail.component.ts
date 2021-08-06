import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency, Security, Settings } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { MoneyDecoderPipe } from '../../utils/money-decoder.pipe';
import Language = Settings.Language;

@Component({
  templateUrl: './security-detail.component.html'
})
export class SecurityDetailComponent implements OnInit, OnDestroy {
  private moneyDecoder = new MoneyDecoderPipe();
  private subscription: Subscription;
  security = new Security();

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

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

  decodePrice(value: number): void {
    this.security.price = this.moneyDecoder.transform(String(value));
  }

  update(security: Security): void {
    if (security.id == 0) {
      this.userdata.saveSecurity(security)
        .then(() => this.router.navigate(['/security/' + security.id]))
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateSecurity(security)
        .then(() => this.router.navigate(['/security']))
        .catch(error => {
          security.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(security: Security): void {
    security.isDeleted = true;
    this.update(security);
  }

  isNewSecurity(): boolean {
    return this.security.id == 0;
  }

  hasTransations(): boolean {
    return this.security.transactionAmount > 0;
  }

  isValidForm(): boolean {
    return this.security.name.length > 0
      && this.security.currencyId != 0
      && this.security.price
      && this.security.price.units > 0
      && this.security.price.micros >= 0;
  }
}
