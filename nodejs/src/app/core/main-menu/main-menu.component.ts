import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { TransactionCriteriaService } from '../../transaction/transaction-criteria.service';
import { Transaction } from '../model/model';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})
export class MainMenuComponent implements OnDestroy {
  constructor(private auth: AuthService,
              private userdata: UserDataService,
              private criteria: TransactionCriteriaService,
              private router: Router) {
    let hasActiveAttempt = false;
    this.userdata.readCache();
    this.subscription = auth.subscribeOnSignIn(
      () => {
        hasActiveAttempt = true;
        userdata.refresh(() => hasActiveAttempt = false);
      },
      () => hasActiveAttempt
    );
  }

  private readonly subscription: Subscription;

  signout(): void {
    this.auth.signOut();
  }

  incomes(): void {
    this.router.navigate(['/transaction'], {
      queryParams:
        { transaction_type: Transaction.Type.INCOME, year: this.criteria.year, month: this.criteria.month }
    });
  }

  expences(): void {
    this.router.navigate(['/transaction'], {
      queryParams:
        { transaction_type: Transaction.Type.EXPENSE, year: this.criteria.year, month: this.criteria.month }
    });
  }

  transfers(): void {
    this.router.navigate(['/transaction'], {
      queryParams:
        { transaction_type: Transaction.Type.TRANSFER, year: this.criteria.year, month: this.criteria.month }
    });
  }

  search(): void {
    this.router.navigate(['/transaction'], {
      queryParams:
        { ...this.criteria.toQueryParams(), is_search: 1 }
    });
  }

  reportNoOffBudget(path: string): void {
    this.router.navigate([path], { queryParams: { no_off_budget: 1 } });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

