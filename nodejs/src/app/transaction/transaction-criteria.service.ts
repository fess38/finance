import { Params } from '@angular/router';
import { Date_, Transaction } from '../core/model/model';
import { DateUtils } from '../utils/date-utils';
import { TransactionUtils } from './transaction-utils';

export class TransactionCriteriaService {
  readonly amountThreshold = 250;
  year: number = DateUtils.currentYear();
  month: number = DateUtils.currentMonth();
  day: number;
  accountId: number;
  categoryId: number;
  subCategoryId: number;
  familyMemberId: number;
  transactionAmount: number;
  transactionType: number;
  source: string;

  update(params: Params): void {
    if (params.year) {
      this.year = params.year;
    }
    if (params.month) {
      this.month = params.month;
    }
    this.day = params.day;
    this.accountId = params.account_id;
    this.categoryId = params.category_id;
    this.subCategoryId = params.sub_category_id;
    this.familyMemberId = params.family_member_id;
    this.transactionAmount = params.transaction_amount;
    this.transactionType = params.transaction_type;
    this.source = params.source;
  }

  previousMonth(): void {
    if (this.month == 1) {
      this.month = 12;
      this.year--;
    } else {
      this.month--;
    }
  }

  nextMonth(): void {
    if (this.month == 12) {
      this.month = 1;
      this.year++;
    } else {
      this.month++;
    }
  }

  previousYear(): void {
    this.year--;
  }

  nextYear(): void {
    this.year++;
  }

  isFit(t: Transaction): boolean {
    let result = true;
    const date: Date_ = DateUtils.parseDate_(t.created);
    if (this.filterByDate() && this.year && this.year != date.year) {
      result = false;
    }
    if (this.filterByDate() && this.month && this.month != date.month) {
      result = false;
    }
    if (this.filterByDate() && this.day && this.day != date.day) {
      result = false;
    }
    if (this.accountId && this.accountId != t.accountIdFrom && this.accountId != t.accountIdTo) {
      result = false;
    }
    if (this.categoryId && this.categoryId != t.categoryId) {
      result = false;
    }
    if (this.subCategoryId && this.subCategoryId != t.subCategoryId) {
      result = false;
    }
    if (this.familyMemberId && this.familyMemberId != t.familyMemberId) {
      result = false;
    }
    if (this.transactionType && this.transactionType != TransactionUtils.type(t)) {
      result = false;
    }
    return result;
  }

  private filterByDate(): boolean {
    return (this.accountId == null && this.categoryId == null && this.subCategoryId == null
      && this.familyMemberId == null) || (this.transactionAmount || 0) > this.amountThreshold;
  }

  toQueryParams(): any {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      account_id: this.accountId,
      category_id: this.categoryId,
      sub_category_id: this.subCategoryId,
      family_member_id: this.familyMemberId,
      transaction_amount: this.transactionAmount,
      transaction_type: this.transactionType
    };
  }
}
