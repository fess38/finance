import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import { Category, Month, SubCategory, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils } from '../transaction-utils';

@Component({
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  months: Month[] = [];
  transactions: Transaction[];

  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
    this.transactions = _.chain(this.userdata.transactions())
      .filter(x => this.criteria.isFit(x))
      .sortBy(x => x.created)
      .reverse()
      .value();
    _.chain(this.transactions)
      .sortBy(x => x.created)
      .reverse()
      .map(x => DateUtils.parseMonth(x.created))
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
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

  hasSource(): boolean {
    return (this.criteria.source || '').length > 0;
  }

  return(): void {
    this.router.navigate(['/' + this.criteria.source || '']);
  }

  private filterTransactions(month: Month): Transaction[] {
    return _.chain(this.transactions)
      .filter(x => {
        const currentMonth = DateUtils.parseMonth(x.created);
        return currentMonth.year == month.year && currentMonth.month == month.month;
      })
      .sortBy(x => x.created)
      .reverse()
      .value();
  }

  formatCategory(transaction: Transaction): string {
    let result = 'transaction_detail.transfer';
    const category: Category = this.userdata.findCategory(transaction.categoryId);
    const subCategory: SubCategory = this.userdata.findSubCategory(transaction.subCategoryId);
    if (subCategory) {
      result = subCategory.name
    } else if (category) {
      result = category.name;
    }
    return result;
  }

  isIncome(transaction: Transaction): boolean {
    return TransactionUtils.type(transaction) == Transaction.Type.INCOME;
  }

  isExpence(transaction: Transaction): boolean {
    return TransactionUtils.type(transaction) == Transaction.Type.EXPENSE;
  }

  isTransfer(transaction: Transaction): boolean {
    return TransactionUtils.type(transaction) == Transaction.Type.TRANSFER;
  }

  currencySymbol(accountId: number): string {
    return this.userdata.findCurrency(this.userdata.findAccount(accountId).currencyId).symbol;
  }
}
