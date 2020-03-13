import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category, Currency, Date_, Month, SubCategory, Summary, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils as Utils } from '../transaction-utils';

@Component({
  templateUrl: 'transaction-date.component.html',
  styleUrls: ['transaction-date.component.css']
})
export class TransactionDateComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) { }

  private subscription: Subscription;
  private allTransactions: Transaction[] = [];
  private transactions: Transaction[] = [];
  private incomeTransactions: Transaction[] = [];
  private expenseTransactions: Transaction[] = [];
  private categories: Category[] = [];
  private subCategories: SubCategory[] = [];

  incomeCategories: Category[] = [];
  expenseCategories: Category[] = [];
  dates: Date_[] = [];
  currency: Currency;
  currencies: Currency[] = [];
  dateCategorySummaries = new Map<string, Summary>();
  dateSubCategorySummaries = new Map<string, Summary>();
  incomeDateSummaries = new Map<string, Summary>();
  expenseDateSummaries = new Map<string, Summary>();
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
    this.subCategories = Utils.subCategories(this.transactions, this.userdata);
    this.incomeCategories = this.categories.filter(x => x.isIncome);
    this.expenseCategories = this.categories.filter(x => x.isExpense);
    this.income = Utils.income(this.transactions);
    this.expense = Utils.expense(this.transactions);
    this.incomeDateSummaries = this.dateSummaries(this.incomeTransactions, this.income);
    this.expenseDateSummaries = this.dateSummaries(this.expenseTransactions, this.expense);
    this.categorySummaries = Utils.categorySummaries(this.transactions, this.income, this.expense);
    this.subCategorySummaries = Utils.subCategorySummaries(this.transactions, this.income, this.expense);
    this.updateDateCategorySummaries();
    this.updateDateSubCategorySummaries();
  }

  private updateTransactions(): void {
    const types: Transaction.Type[] = [Transaction.Type.INCOME, Transaction.Type.EXPENSE];
    this.allTransactions = this.userdata.transactions()
      .filter(x => types.includes(Utils.type(x)))
      .filter(x => this.criteria.isFit(x));
    this.transactions = this.allTransactions
      .filter(x => {
        const accountId: number = Math.max(Number(x.accountIdFrom), Number(x.accountIdTo));
        return this.userdata.findAccount(accountId).currencyId == this.currency.id;
      });
  }

  private updateDateCategorySummaries(): void {
    this.dateCategorySummaries.clear();
    const group = new Map<string, Transaction[]>();
    this.transactions.forEach(x => {
      const key: string = x.created + ',' + x.categoryId.toString();
      group.set(key, (group.get(key) || []).concat(x));
    });
    group.forEach((value, key) => {
      const category = this.userdata.findCategory(+key.split(',')[1]);
      const amount: number = value
        .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      const sum: number = category.isIncome ? this.income : this.expense;
      this.dateCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
  }

  private updateDateSubCategorySummaries(): void {
    this.dateSubCategorySummaries.clear();
    const group = new Map<string, Transaction[]>();
    this.transactions
      .filter(x => x.subCategoryId > 0)
      .forEach(x => {
        const key: string = x.created + ',' + x.subCategoryId.toString();
        group.set(key, (group.get(key) || []).concat(x));
      });
    group.forEach((value, key: string) => {
        const subCategory = this.userdata.findSubCategory(+key.split(',')[1]);
        const category = this.userdata.findCategory(subCategory.categoryId);
        const amount: number = value
          .map(x => Math.max(Number(x.amountFrom), Number(x.amountTo)))
          .reduce((x1, x2) => x1 + x2, 0);
        const sum: number = category.isIncome ? this.income : this.expense;
        this.dateSubCategorySummaries.set(key, new Summary({ amount: amount, share: amount / sum }));
      });
  }

  private dateSummaries(transactions: Transaction[], sum: number): Map<string, Summary> {
    const result = new Map<string, Summary>();
    const group = new Map<string, Transaction[]>();
    transactions.forEach(x => group.set(x.created, (group.get(x.created) || []).concat(x)));
    group.forEach((value, key: string) => {
      const amount: number = value
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0);
      result.set(key, new Summary({ amount: amount, share: amount / sum }));
    });
    return result;
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
    const summary: Summary = this.dateCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findDateSubCategorySummary(date: Date_, subCategory: SubCategory): Summary[] {
    const result: Summary[] = [];
    const key: string = `${DateUtils.formatDate_(date)},${subCategory.id}`;
    const summary: Summary = this.dateSubCategorySummaries.get(key);
    if (summary) {
      result.push(summary);
    }
    return result;
  }

  findIncomeDateSummary(date: Date_): number {
    const summary: Summary = this.incomeDateSummaries.get(DateUtils.formatDate_(date));
    return summary ? <number>summary.amount : undefined;
  }

  findExpenseDateSummary(date: Date_): number {
    const summary: Summary = this.expenseDateSummaries.get(DateUtils.formatDate_(date));
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

  routeCategory(category: Category): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        category_id: category.id,
        transaction_amount: 1000,
        source: 'report/date',
        year: this.criteria.year,
        month: this.criteria.month
      }
    });
  }

  routeSubCategory(subCategory: SubCategory): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        sub_category_id: subCategory.id,
        transaction_amount: 1000,
        source: 'report/date',
        year: this.criteria.year,
        month: this.criteria.month
      }
    });
  }

  routeIncome(): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        transaction_type: 1,
        transaction_amount: 1000,
        source: 'report/date',
        year: this.criteria.year,
        month: this.criteria.month
      }
    });
  }

  routeExpense(): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        transaction_type: 2,
        transaction_amount: 1000,
        source: 'report/date',
        year: this.criteria.year,
        month: this.criteria.month
      }
    });
  }

  routeDate(date: Date_): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        transaction_amount: 1000,
        source: 'report/date',
        year: this.criteria.year,
        month: this.criteria.month,
        day: date.day
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
