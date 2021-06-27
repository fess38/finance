import { Params } from '@angular/router';
import { Date_, Transaction } from '../core/model/model';
import { DateUtils } from '../utils/date-utils';
import { TransactionUtils } from './transaction-utils';

export class TransactionCriteriaService {
  year: number = DateUtils.currentYear();
  month: number = DateUtils.currentMonth();
  day: number;
  transactionType: number;
  accountId: number;
  categoryId: number;
  subCategoryId: number;
  familyMemberId: number;
  comment: string = '';
  source: string = '';
  isSearch: number;
  noOffBudget: number;

  update(params: Params): void {
    if (params.year) {
      this.year = params.year;
    }
    if (params.month) {
      this.month = params.month;
    }
    this.day = params.day;
    this.transactionType = params.transaction_type;
    this.accountId = params.account_id;
    this.categoryId = params.category_id;
    this.subCategoryId = params.sub_category_id;
    this.familyMemberId = params.family_member_id;
    this.comment = this.formatComment(params.comment);
    this.source = params.source;
    this.isSearch = params.is_search;
    this.noOffBudget = params.no_off_budget;
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

  isFit(t: Transaction, usingDate: boolean = true): boolean {
    let result = true;
    const date: Date_ = DateUtils.parseDate_(t.created);
    if (usingDate && this.year && this.year != date.year) {
      result = false;
    }
    if (usingDate && this.month && this.month != date.month) {
      result = false;
    }
    if (usingDate && this.day && this.day != date.day) {
      result = false;
    }
    if (this.transactionType && this.transactionType != TransactionUtils.type(t)) {
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
    if (this.comment && (!t.comment || !this.formatComment(t.comment).match(this.comment))) {
      result = false;
    }
    if (this.noOffBudget && t.offBudget) {
      result = false;
    }
    return result;
  }

  private formatComment(comment: string): string {
    return (comment ?? '').toLowerCase().trim();
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
      comment: this.comment,
      transaction_type: this.transactionType,
      source: this.source,
      is_search: this.isSearch,
      no_off_budget: this.noOffBudget
    };
  }
}
