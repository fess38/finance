import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import { Category, Currency, Date_, Month, Summary, Transaction } from '../../core/model/model';
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
  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];
  dates: Date_[] = [];
  currency: Currency;
  currencies: Currency[] = [];
  dateCategorySummaries = new Map<string, Summary>();
  incomeDateSummaries = new Map<string, Summary>();
  expenseDateSummaries = new Map<string, Summary>();
  categorySummaries = new Map<number, Summary>();
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
    this.incomeCategories = this.categories.filter(x => x.isIncome);
    this.expenseCategories = this.categories.filter(x => x.isExpense);
    this.income = Utils.income(this.transactions);
    this.expense = Utils.expense(this.transactions);
    this.incomeDateSummaries = Utils.dateSummaries(this.incomeTransactions, this.income);
    this.expenseDateSummaries = Utils.dateSummaries(this.expenseTransactions, this.expense);
    this.categorySummaries = Utils.categorySummaries(this.transactions, this.income, this.expense);
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
      const category = this.userdata.findCategory(+key.split(',')[1]);
      const amount: number = _.chain(value[key])
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0)
        .value();
      const sum: number = category.isIncome ? this.income : this.expense;
      this.dateCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
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

  findDateCategorySummary(date: Date_, category: Category): Summary[] {
    const result: Summary[] = [];
    const key: string = `${DateUtils.formatDate_(date)},${category.id}`;
    const summary: Summary =  this.dateCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findIncomeDateSummary(date: Date_): number {
    const summary: Summary =  this.incomeDateSummaries.get(DateUtils.formatDate_(date));
    return summary ? <number>summary.amount : undefined;
  }

  findExpenseDateSummary(date: Date_): number {
    const summary: Summary =  this.expenseDateSummaries.get(DateUtils.formatDate_(date));
    return summary ? <number>summary.amount : undefined;
  }

  findCategorySummary(category: Category): Summary {
    return this.categorySummaries.get(Number(category.id));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
