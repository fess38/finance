import { Transaction } from '../core/model/model';

export class TransactionMatcher {
  static match(template: Transaction, transaction: Transaction): boolean {
    let result: boolean = true;
    if (template.accountIdFrom != transaction.accountIdFrom) {
      result = false;
    } else if (template.accountIdTo != transaction.accountIdTo) {
      result = false;
    } else if (template.categoryId != transaction.categoryId) {
      result = false;
    } else if (template.subCategoryId != transaction.subCategoryId) {
      result = false;
    } else if (template.familyMemberId != transaction.familyMemberId) {
      result = false;
    }
    return result;
  }
}
