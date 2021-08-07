import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, Category, FamilyMember, Month, SubCategory, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils } from '../transaction-utils';
import Type = Transaction.Type;

@Component({
  templateUrl: 'transaction-list.component.html'
})
export class TransactionListComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  month: Month;
  transactions: Transaction[];

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
    this.month = new Month({ year: this.criteria.year, month: this.criteria.month });
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
  }

  private onInitCallback(): void {
    this.transactions = this.userdata.transactions()
      .filter(x => this.criteria.isFit(x))
      .sort((a, b) => {
        return a.created + a.id.toString() < b.created + b.id.toString() ? 1 : -1;
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  typesWithLabels(): any[] {
    return TransactionUtils.typesWithLabels;
  }

  params(): Criteria {
    return this.criteria;
  }

  accounts(): Account[] {
    return this.userdata.accounts().sort((a, b) => a.name < b.name ? -1 : 1);
  }

  categories(): Category[] {
    return this.userdata.categories()
      .filter(x => (
        this.criteria.transactionType == Type.INCOME && x.isIncome)
        || (this.criteria.transactionType == Type.EXPENSE && x.isExpense)
      )
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  subCategories(): SubCategory[] {
    return this.userdata.subCategories()
      .filter(x => x.categoryId == this.criteria.categoryId)
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  familyMembers(): FamilyMember[] {
    return this.userdata.familyMembers().sort((a, b) => a.name < b.name ? -1 : 1);
  }

  search(key: string, value: string): void {
    if (key == 'comment') {
      this.criteria.comment = value ?? null;
    } else {
      let numberValue = Number(value) ?? null;
      if (isNaN(numberValue)) {
        numberValue = null;
      }
      switch (key) {
        case 'transaction_type':
          this.criteria.transactionType = numberValue;
          break;
        case 'account_id':
          this.criteria.accountId = numberValue;
          break;
        case 'category_id':
          this.criteria.categoryId = numberValue;
          break;
        case 'sub_category_id':
          this.criteria.subCategoryId = numberValue;
          break;
        case 'family_member_id':
          this.criteria.familyMemberId = numberValue;
          break;
        case 'no_off_budget':
          this.criteria.noOffBudget = numberValue == 1 ? 1 : null;
          break;
      }
    }
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
  }

  locale(): string {
    return this.userdata.locale();
  }

  private switchMonth(next: boolean) {
    const criteriaMonth = new Month({ year: this.criteria.year, month: this.criteria.month });
    const monthsToSwitch = this.userdata.transactions()
      .filter(x => this.criteria.isFit(x, false))
      .map(x => (DateUtils.parseMonth(x.created)))
      .filter(x => (DateUtils.sortMonths(x, criteriaMonth) == (next ? 1 : -1)))
      .sort(DateUtils.sortMonths);
    const monthToSwitch = monthsToSwitch[next ? 0 : monthsToSwitch.length - 1];
    if (monthToSwitch) {
      this.criteria.year = monthToSwitch.year;
      this.criteria.month = monthToSwitch.month;
      this.criteria.isSearch = null;
      this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
    }
  }

  previousMonth(): void {
    this.switchMonth(false);
  }

  nextMonth(): void {
    this.switchMonth(true);
  }

  hasSource(): boolean {
    return (this.criteria.source || '').length > 0;
  }

  return(): void {
    this.router.navigate(['/' + this.criteria.source || '']);
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
    return TransactionUtils.type(transaction) == Type.INCOME;
  }

  isExpence(transaction: Transaction): boolean {
    return TransactionUtils.type(transaction) == Type.EXPENSE;
  }

  isTransfer(transaction: Transaction): boolean {
    return TransactionUtils.type(transaction) == Type.TRANSFER;
  }
}
