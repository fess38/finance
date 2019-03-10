import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import { Month, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtilsService as Utils } from '../transaction-utils.service';

@Component({
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  months: Month[] = [];
  transactions: Transaction[];

  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
    this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
    this.transactions = _.chain(this.userdata.transactions())
      .filter(x => !x.isDeleted)
      .filter(x => this.criteria.isFit(x))
      .sortBy(x => x.created)
      .reverse()
      .value();
    _.chain(this.transactions)
      .sortBy(x => x.created)
      .reverse()
      .map(x => Utils.parseMonth(x.created))
      .unique(true, (x) => String(x.year) + String(x.month))
      .value()
      .forEach(x => {
        if (!this.months.includes(x)) {
          this.months.push(x);
        }
      });
    if (this.months.length == 0) {
      this.months.push(new Month({ year: this.criteria.year, month: this.criteria.month }));
    }
  }

  manyMonths(): boolean {
    return this.criteria.transactionAmount != null
      && this.criteria.transactionAmount < this.criteria.amountThreshold;
  }

  locale(): string {
    return this.userdata.locale();
  }

  previousMonth(): void {
    this.criteria.previousMonth();
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
  }

  nextMonth(): void {
    this.criteria.nextMonth();
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
  }

  return(): void {
    this.router.navigate(['/' + this.criteria.source || '']);
  }

  private filterTransactions(month: Month): Transaction[] {
    return _.chain(this.transactions)
      .filter(x => {
        const currentMonth = Utils.parseMonth(x.created);
        return currentMonth.year == month.year && currentMonth.month == month.month;
      })
      .sortBy(x => x.created)
      .reverse()
      .value();
  }

  formatCategory(transaction: Transaction): string {
    return _.chain(this.userdata.categories())
      .filter(x => x.id == transaction.categoryId)
      .map(x => x.name)
      .value().pop() || 'transaction_detail.transfer';
  }

  isIncome(transaction: Transaction): boolean {
    return Utils.type(transaction) == Transaction.Type.INCOME;
  }

  isExpence(transaction: Transaction): boolean {
    return Utils.type(transaction) == Transaction.Type.EXPENSE;
  }

  isTransfer(transaction: Transaction): boolean {
    return Utils.type(transaction) == Transaction.Type.TRANSFER;
  }

  currencySymbol(accountId: number): string {
    const account = this.userdata.accounts().filter(x => x.id == accountId)[0];
    return this.userdata.currencies()
      .filter(x => x.id == account.currencyId)
      .map(x => x.symbol)[0] || '';
  }
}
