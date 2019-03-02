import { Params } from '@angular/router';
import { Transaction } from '../core/model/model';

import { TransactionCriteriaService as Criteria } from './transaction-criteria.service';
import { TransactionUtilsService } from './transaction-utils.service';

describe('TransactionCriteriaService', () => {
  let criteria;

  beforeEach(() => {
    criteria = new Criteria();
  });

  it('should fit criteria true 1', () => {
    const params: Params = { account_id: 123, family_member_id: 234 };
    criteria.update(params);
    const transaction: Transaction = new Transaction({
      id: 0,
      created: TransactionUtilsService.currentDate(),
      categoryId: 4,
      accountIdFrom: 123,
      accountIdTo: -1,
      amountFrom: 0,
      amountTo: 0,
      familyMemberId: 234
    });
    expect(criteria.isFit(transaction)).toBe(true);
  });

  it('should fit criteria true 2', () => {
    const params: Params = { account_id: 123, category_id: 1239 };
    criteria.update(params);
    const transaction: Transaction = new Transaction({
      id: 0,
      created: TransactionUtilsService.currentDate(),
      categoryId: 1239,
      accountIdFrom: -1,
      accountIdTo: 123,
      amountFrom: 10,
      amountTo: -1,
      familyMemberId: 234
    });
    expect(criteria.isFit(transaction)).toBe(true);
  });

  it('should fit criteria false 1', () => {
    const params: Params = { account_id: 123 };
    criteria.update(params);
    const transaction: Transaction = new Transaction({
      id: 0,
      created: TransactionUtilsService.currentDate(),
      categoryId: 1239,
      accountIdFrom: -1,
      accountIdTo: 1234,
      amountFrom: 10,
      amountTo: -1,
      familyMemberId: 234
    });
    expect(criteria.isFit(transaction)).toBe(false);
  });

});
