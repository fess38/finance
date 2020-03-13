import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Month, SubCategory, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils } from '../transaction-utils';

@Component({
  templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  months: Month[] = [];
  transactions: Transaction[];

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
    this.transactions = this.userdata.transactions()
      .filter(x => this.criteria.isFit(x))
      .sort((a, b) => {
        return a.created + a.id.toString() < b.created + b.id.toString() ? 1 : -1;
      });
    const months = new Map<string, Month>();
    this.transactions
      .sort((a, b) => {
        return a.created + a.id.toString() < b.created + b.id.toString() ? 1 : -1;
      })
      .map(x => DateUtils.parseMonth(x.created))
      .forEach(x => months.set(String(x.year) + String(x.month), x));
    months.forEach((month) => {
      if (!this.months.includes(month)) {
        this.months.push(month);
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
    return this.transactions.filter(x => {
      const currentMonth = DateUtils.parseMonth(x.created);
      return currentMonth.year == month.year && currentMonth.month == month.month;
    })
      .sort((a, b) => {
        return a.created + a.id.toString() < b.created + b.id.toString() ? 1 : -1;
      });
  }

  formatCategory(transaction: Transaction): string {
    let result = 'transaction_detail.transfer';
    const category: Category = this.userdata.findCategory(transaction.categoryId);
    const subCategory: SubCategory = this.userdata.findSubCategory(transaction.subCategoryId);
    if (subCategory) {
      result = subCategory.name;
    } else if (category) {
      result = category.name;
    }
    return result;
  }

  isShowTooltip(transaction: Transaction): boolean {
    return transaction.comment.length > 0;
  }

  formatTooltip(transaction: Transaction): string {
    let result = '';
    if (transaction.comment) {
      result = transaction.comment;
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
