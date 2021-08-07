import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Currency, Month, SubCategory, Summary, Transaction, Year } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils as Utils } from '../transaction-utils';

@Component({
  templateUrl: 'transaction-month.component.html',
  styleUrls: ['../transaction-date/transaction-date.component.css']
})
export class TransactionMonthComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  private allTransactions: Transaction[] = [];
  private transactions: Transaction[] = [];
  private incomeTransactions: Transaction[] = [];
  private expenseTransactions: Transaction[] = [];
  private categories: Category[] = [];
  private subCategories: SubCategory[] = [];

  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];
  months: Month[] = [];
  currency: Currency;
  currencies: Currency[] = [];
  monthCategorySummaries = new Map<string, Summary>();
  monthSubCategorySummaries = new Map<string, Summary>();
  incomeMonthSummaries = new Map<string, Summary>();
  expenseMonthSummaries = new Map<string, Summary>();
  categorySummaries = new Map<number, Summary>();
  subCategorySummaries = new Map<number, Summary>();
  income: number;
  expense: number;

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
    this.months = DateUtils.months(this.criteria.year);
    this.currency = this.userdata.findCurrency(this.userdata.settings().currencyId);
    this.onChangeCurrency();
  }

  onChangeCurrency(): void {
    this.updateTransactions();
    this.currencies = Utils.currencies(this.allTransactions, this.userdata);
    this.incomeTransactions = Utils.incomeTransactions(this.transactions);
    this.expenseTransactions = Utils.expenseTransactions(this.transactions);
    this.categories = Utils.categories(this.transactions, this.userdata);
    this.subCategories = Utils.subCategories(this.transactions, this.userdata);
    this.incomeCategories = this.categories.filter(x => x.isIncome);
    this.expenseCategories = this.categories.filter(x => x.isExpense);
    this.income = Utils.income(this.transactions);
    this.expense = Utils.expense(this.transactions);
    this.incomeMonthSummaries = this.monthSummaries(this.incomeTransactions, this.income);
    this.expenseMonthSummaries = this.monthSummaries(this.expenseTransactions, this.expense);
    this.categorySummaries = Utils.categorySummaries(this.transactions, this.income, this.expense);
    this.subCategorySummaries = Utils.subCategorySummaries(this.transactions, this.income, this.expense);
    this.updateMonthCategorySummaries();
    this.updateMonthSubCategorySummaries();
  }

  private updateTransactions(): void {
    const types: Transaction.Type[] = [Transaction.Type.INCOME, Transaction.Type.EXPENSE];
    this.allTransactions = this.userdata.transactions()
      .filter(x => types.includes(Utils.type(x)))
      .filter(x => !this.userdata.settings().noOffBudget || !x.offBudget)
      .filter(x => DateUtils.parseDate_(x.created).year == this.criteria.year);
    this.transactions = this.allTransactions.filter(x => {
      const accountId: number = Math.max(Number(x.accountIdFrom), Number(x.accountIdTo));
      return this.userdata.findAccount(accountId).currencyId == this.currency.id;
    });
  }

  private updateMonthCategorySummaries(): void {
    this.monthCategorySummaries.clear();
    const group = new Map<string, Transaction[]>();
    this.transactions.forEach(x => {
      const key: string = DateUtils.parseAndFormatMonth(x.created) + ',' + x.categoryId.toString();
      group.set(key, (group.get(key) || []).concat(x));
    });
    group.forEach((value, key: string) => {
      const category = this.userdata.findCategory(+key.split(',')[1]);
      const amount: number = value
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      const sum: number = category.isIncome ? this.income : this.expense;
      this.monthCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
  }

  private updateMonthSubCategorySummaries(): void {
    this.monthSubCategorySummaries.clear();
    const group = new Map<string, Transaction[]>();
    this.transactions
      .filter(x => x.subCategoryId > 0)
      .forEach(x => {
        const key: string = DateUtils.parseAndFormatMonth(x.created) + ','
          + x.subCategoryId.toString();
        group.set(key, (group.get(key) || []).concat(x));
      });
    group.forEach((value, key: string) => {
      const subCategory = this.userdata.findSubCategory(+key.split(',')[1]);
      const category = this.userdata.findCategory(subCategory.categoryId);
      const amount: number = value
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      const sum: number = category.isIncome ? this.income : this.expense;
      this.monthSubCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
  }

  private monthSummaries(transactions: Transaction[], sum: number): Map<string, Summary> {
    const result = new Map<string, Summary>();
    const group = new Map<string, Transaction[]>();
    transactions.forEach(x => {
      const key: string = DateUtils.parseAndFormatMonth(x.created);
      group.set(key, (group.get(key) || []).concat(x));
    });
    group.forEach((value, key: string) => {
      const amount: number = value
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      result.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
    return result;
  }

  previousYear(): void {
    this.criteria.previousYear();
    this.router.navigate(['/report/month'], { queryParams: this.criteria.toQueryParams() });
  }

  nextYear(): void {
    this.criteria.nextYear();
    this.router.navigate(['/report/month'], { queryParams: this.criteria.toQueryParams() });
  }

  year(): Year {
    return new Year({ value: this.criteria.year });
  }

  findMonthCategorySummary(month: Month, category: Category): Summary[] {
    const result: Summary[] = [];
    const key: string = `${DateUtils.formatMonth(month)},${category.id}`;
    const summary: Summary = this.monthCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findMonthSubCategorySummary(month: Month, subCategory: SubCategory): Summary[] {
    const result: Summary[] = [];
    const key: string = `${DateUtils.formatMonth(month)},${subCategory.id}`;
    const summary: Summary = this.monthSubCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findIncomeMonthSummary(month: Month): number {
    const summary: Summary = this.incomeMonthSummaries.get(DateUtils.formatMonth(month));
    return summary ? <number>summary.amount : undefined;
  }

  findExpenseMonthSummary(month: Month): number {
    const summary: Summary = this.expenseMonthSummaries.get(DateUtils.formatMonth(month));
    return summary ? <number>summary.amount : undefined;
  }

  findCategorySummary(category: Category): Summary {
    return this.categorySummaries.get(Number(category.id));
  }

  findSubCategorySummary(subCategory: SubCategory): Summary {
    return this.subCategorySummaries.get(Number(subCategory.id));
  }

  findSubCategories(category: Category): SubCategory[] {
    return this.subCategories.filter(x => x.categoryId == category.id);
  }

  routeMonthCategory(month: Month, category: Category): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        category_id: category.id,
        source: 'report/month',
        year: month.year,
        month: month.month
      }
    });
  }

  routeMonthSubCategory(month: Month, subCategory: SubCategory): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        sub_category_id: subCategory.id,
        source: 'report/month',
        year: month.year,
        month: month.month
      }
    });
  }

  routeMonth(month: Month): void {
    this.router.navigate(['/report/date'], {
      queryParams: {
        year: month.year,
        month: month.month
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
