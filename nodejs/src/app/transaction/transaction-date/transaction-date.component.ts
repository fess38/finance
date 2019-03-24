import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import { Category, Currency, Date_, Month, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils as Utils } from '../transaction-utils';

@Component({
  templateUrl: './transaction-date.component.html',
  styleUrls: ['./transaction-date.component.css']
})
export class TransactionDateComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private allTransactions: Transaction[] = [];
  private transactions: Transaction[] = [];
  private incomeTransactions: Transaction[] = [];
  private expenseTransactions: Transaction[] = [];
  private categories: Category[] = [];
  dates: Date_[] = [];
  currency: Currency;
  currencies: Currency[] = [];
  dateCategorySummaries = new Map<string, number>();
  incomeDateSummaries = new Map<string, number>();
  expenseDateSummaries = new Map<string, number>();
  categorySummaries = new Map<number, number>();
  income: number;
  expense: number;

  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
    this.dates = DateUtils.dates(this.criteria.year, this.criteria.month);
    this.currency = this.userdata.findCurrency(this.userdata.settings().currencyId);
    this.onChangeCurrency();
  }

  onChangeCurrency(): void {
    this.updateTransactions();
    this.currencies = Utils.currencies(this.allTransactions, this.userdata);
    this.incomeTransactions = Utils.incomeTransactions(this.transactions);
    this.expenseTransactions = Utils.expenseTransactions(this.transactions);
    this.categories = Utils.categories(this.transactions, this.userdata);
    this.income = Utils.income(this.transactions);
    this.expense = Utils.expense(this.transactions);
    this.incomeDateSummaries = Utils.dateSummaries(this.incomeTransactions);
    this.expenseDateSummaries = Utils.dateSummaries(this.expenseTransactions);
    this.categorySummaries = Utils.categorySummaries(this.transactions);
    this.updateDateCategorySummaries();
  }

  private updateTransactions(): void {
    const types: Transaction.Type[] = [Transaction.Type.INCOME, Transaction.Type.EXPENSE];
    this.allTransactions = _.chain(this.userdata.transactions())
      .filter(x => types.includes(Utils.type(x)))
      .filter(x => this.criteria.isFit(x))
      .value();
    this.transactions = this.allTransactions
      .filter(x => {
        const accountId: number = Math.max(Number(x.accountIdFrom), Number(x.accountIdTo));
        return this.userdata.findAccount(accountId).currencyId == this.currency.id;
      });
  }

  private updateDateCategorySummaries(): void {
    this.dateCategorySummaries.clear();

    const value: Transaction[][] = _.chain(this.transactions)
      .groupBy(x => [x.created, x.categoryId])
      .value();
    for (let key in value) {
      const amount: number = _.chain(value[key])
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0)
        .value();
      this.dateCategorySummaries.set(key, amount);
    }
  }

  previousMonth(): void {
    this.criteria.previousMonth();
    this.router.navigate(['/report/date'], { queryParams: this.criteria.toQueryParams() });
  }

  nextMonth(): void {
    this.criteria.nextMonth();
    this.router.navigate(['/report/date'], { queryParams: this.criteria.toQueryParams() });
  }

  month(): Month {
    return new Month({ year: this.criteria.year, month: this.criteria.month });
  }

  locale(): string {
    return this.userdata.locale();
  }

  incomeCategories(): Category[] {
    return this.categories.filter(x => x.isIncome);
  }

  expenseCategories(): Category[] {
    return this.categories.filter(x => x.isExpense);
  }

  findDateCategorySummary(date: Date_, category: Category): number {
    return this.dateCategorySummaries.get(`${DateUtils.formatDate_(date)},${category.id}`);
  }

  findIncomeDateSummary(date: Date_): number {
    return this.incomeDateSummaries.get(DateUtils.formatDate_(date));
  }

  findExpenseDateSummary(date: Date_): number {
    return this.expenseDateSummaries.get(DateUtils.formatDate_(date));
  }

  findCategorySummary(category: Category): number {
    return this.categorySummaries.get(Number(category.id));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
