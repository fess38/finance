import { Params } from '@angular/router';
import { Transaction } from '../core/model/model';
import { SimpleDate, TransactionUtilsService } from './transaction-utils.service';

export class TransactionCriteriaService {
  year: number = TransactionUtilsService.currentYear();
  month: number = TransactionUtilsService.currentMonth();
  day: number;
  accountId: number;
  categoryId: number;
  subCategoryId: number;
  familyMemberId: number;

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
  }

  isFit(t: Transaction): boolean {
    let result = true;
    const simpleDate: SimpleDate = TransactionUtilsService.parseDate(t.created);
    if (this.year && this.year != simpleDate.year) {
      result = false;
    }
    if (this.month && this.month != simpleDate.month) {
      result = false;
    }
    if (this.day && this.day != simpleDate.day) {
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
    return result;
  }

  toQueryParams(): any {
    return {
      year: this.year,
      month: this.month,
      day: this.day,
      account_id: this.accountId,
      category_id: this.categoryId,
      sub_category_id: this.subCategoryId,
      family_member_id: this.familyMemberId
    }
  }
}
