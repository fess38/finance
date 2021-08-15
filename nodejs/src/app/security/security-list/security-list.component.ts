import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Security } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { SecurityUtils } from '../security-utils';

@Component({
  templateUrl: 'security-list.component.html'
})
export class SecurityListComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService) {}

  private subscription: Subscription;
  private totalCost = 0;

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnInit(() => {
      this.userdata.securities().forEach(security => {
        this.totalCost += this.cost(security);
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  securities(): Security[] {
    return this.userdata.securities().sort((a, b) => a.name < b.name ? -1 : 1);
  }

  cost(security: Security): number {
    return SecurityUtils.moneyToNumber(security.price)
      * SecurityUtils.moneyToNumber(security.exchangeRate)
      * security.amount;
  }

  share(security: Security): number {
    if (this.totalCost == 0) {
      return 0;
    } else {
      return this.cost(security) / this.totalCost;
    }
  }

}
