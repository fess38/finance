import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionCriteriaService } from '../../transaction/transaction-criteria.service';
import { Transaction } from '../model/model';

@Component({
  selector: 'app-finance-sidenav',
  templateUrl: 'finance-sidenav.component.html'
})
export class FinanceSidenavComponent {
  constructor(private criteria: TransactionCriteriaService, private router: Router) {}

  incomes(): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        transaction_type: Transaction.Type.INCOME,
        year: this.criteria.year, month: this.criteria.month
      }
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
}
