import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Currency, SubCategory, Summary, Transaction, Year } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionUtils as Utils } from '../transaction-utils';

@Component({
  templateUrl: 'transaction-year.component.html',
  styleUrls: ['../transaction-date/transaction-date.component.css']
})
export class TransactionYearComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
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
  years: Year[] = [];
  currency: Currency;
  currencies: Currency[] = [];
  yearCategorySummaries = new Map<string, Summary>();
  yearSubCategorySummaries = new Map<string, Summary>();
  incomeYearSummaries = new Map<number, Summary>();
  expenseYearSummaries = new Map<number, Summary>();
  categorySummaries = new Map<number, Summary>();
  subCategorySummaries = new Map<number, Summary>();
  income: number;
  expense: number;

  ngOnInit() {
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
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
    this.incomeYearSummaries = this.yearSummaries(this.incomeTransactions, this.income);
    this.expenseYearSummaries = this.yearSummaries(this.expenseTransactions, this.expense);
    this.categorySummaries = Utils.categorySummaries(this.transactions, this.income, this.expense);
    this.subCategorySummaries = Utils.subCategorySummaries(this.transactions, this.income, this.expense);
    this.updateYearCategorySummaries();
    this.updateYearSubCategorySummaries();
  }

  private updateTransactions(): void {
    const types: Transaction.Type[] = [Transaction.Type.INCOME, Transaction.Type.EXPENSE];
    this.allTransactions = this.userdata.transactions()
      .filter(x => types.includes(Utils.type(x)))
      .filter(x => !this.userdata.settings().noOffBudget || !x.offBudget)
    this.transactions = this.allTransactions
      .filter(x => {
        const accountId: number = Math.max(Number(x.accountIdFrom), Number(x.accountIdTo));
        return this.userdata.findAccount(accountId).currencyId == this.currency.id;
      });
    const unique = new Set<number>();
    this.transactions.map(x => DateUtils.parseYear(x.created).value).forEach(x => unique.add(x));
    this.years = Array.from(unique)
      .map(x => new Year({ value: x }))
      .sort((a, b) => a.value < b.value ? -1 : 1);
  }

  private updateYearCategorySummaries(): void {
    this.yearCategorySummaries.clear();
    const group = new Map<string, Transaction[]>();
    this.transactions.forEach(x => {
      const key: string = DateUtils.parseYear(x.created).value + ',' + x.categoryId.toString();
      group.set(key, (group.get(key) || []).concat(x));
    });
    group.forEach((value, key: string) => {
      const category = this.userdata.findCategory(+key.split(',')[1]);
      const amount: number = value
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      const sum: number = category.isIncome ? this.income : this.expense;
      this.yearCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
  }

  private updateYearSubCategorySummaries(): void {
    this.yearSubCategorySummaries.clear();
    const group = new Map<string, Transaction[]>();
    this.transactions
      .filter(x => x.subCategoryId > 0)
      .forEach(x => {
        const key: string = DateUtils.parseYear(x.created).value + ',' + x.subCategoryId.toString();
        group.set(key, (group.get(key) || []).concat(x));
      });
    group.forEach((value, key: string) => {
      const subCategory = this.userdata.findSubCategory(+key.split(',')[1]);
      const category = this.userdata.findCategory(subCategory.categoryId);
      const amount: number = value
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      const sum: number = category.isIncome ? this.income : this.expense;
      this.yearSubCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
  }

  private yearSummaries(transactions: Transaction[], sum: number): Map<number, Summary> {
    const result = new Map<number, Summary>();
    const group = new Map<number, Transaction[]>();
    transactions.forEach(x => {
      const key: number = DateUtils.parseYear(x.created).value;
      group.set(key, (group.get(key) || []).concat(x));
    });
    group.forEach((value, key) => {
      const amount: number = value
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      result.set(+key, new Summary({ amount: amount, share: amount / sum }));
    });
    return result;
  }

  findYearCategorySummary(year: Year, category: Category): Summary[] {
    const result: Summary[] = [];
    const key: string = `${year.value},${category.id}`;
    const summary: Summary = this.yearCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findYearSubCategorySummary(year: Year, subCategory: SubCategory): Summary[] {
    const result: Summary[] = [];
    const key: string = `${year.value},${subCategory.id}`;
    const summary: Summary = this.yearSubCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findIncomeYearSummary(year: Year): number {
    const summary: Summary = this.incomeYearSummaries.get(year.value);
    return summary ? <number>summary.amount : undefined;
  }

  findExpenseYearSummary(year: Year): number {
    const summary: Summary = this.expenseYearSummaries.get(year.value);
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

  routeYear(year: Year): void {
    this.router.navigate(['/report/month'], {
      queryParams: {
        year: year.value,
        month: 1
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
