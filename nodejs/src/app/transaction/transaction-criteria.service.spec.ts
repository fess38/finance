import { Params } from '@angular/router';
import { Transaction } from '../core/model/model';
import { DateUtils } from '../utils/date-utils';

import { TransactionCriteriaService as Criteria } from './transaction-criteria.service';

describe('TransactionCriteriaService', () => {
  let criteria: Criteria;

  beforeEach(() => {
    criteria = new Criteria();
  });

  it('TransactionCriteriaService 1', () => {
    const params: Params = { account_id: 123, family_member_id: 234 };
    criteria.update(params);
    const transaction = new Transaction({
      id: 0,
      created: DateUtils.formatDate(),
      categoryId: 4,
      accountIdFrom: 123,
      accountIdTo: -1,
      amountFrom: 0,
      amountTo: 0,
      familyMemberId: 234
    });
    expect(criteria.isFit(transaction)).toBe(true);
  });

  it('TransactionCriteriaService 2', () => {
    const params: Params = { account_id: 123, category_id: 1239 };
    criteria.update(params);
    const transaction = new Transaction({
      id: 0,
      created: DateUtils.formatDate(),
      categoryId: 1239,
      accountIdFrom: -1,
      accountIdTo: 123,
      amountFrom: 10,
      amountTo: -1,
      familyMemberId: 234
    });
    expect(criteria.isFit(transaction)).toBe(true);
  });

  it('TransactionCriteriaService 3', () => {
    const params: Params = { account_id: 123 };
    criteria.update(params);
    const transaction = new Transaction({
      id: 0,
      created: DateUtils.formatDate(),
      categoryId: 1239,
      accountIdFrom: -1,
      accountIdTo: 1234,
      amountFrom: 10,
      amountTo: -1,
      familyMemberId: 234
    });
    expect(criteria.isFit(transaction)).toBe(false);
  });

  it('TransactionCriteriaService comment 1', () => {
    const params: Params = { comment: 'Foo' };
    criteria.update(params);
    const transaction = new Transaction({
      id: 0,
      created: DateUtils.formatDate(),
      categoryId: 1239,
      accountIdFrom: -1,
      accountIdTo: 1234,
      amountFrom: 10,
      amountTo: -1,
      familyMemberId: 234,
      comment: 'bar foo bar'
    });
    expect(criteria.isFit(transaction)).toBe(true);
  });

  it('TransactionCriteriaService comment 2', () => {
    const params: Params = { comment: 'fooz' };
    criteria.update(params);
    const transaction = new Transaction({
      id: 0,
      created: DateUtils.formatDate(),
      categoryId: 1239,
      accountIdFrom: -1,
      accountIdTo: 1234,
      amountFrom: 10,
      amountTo: -1,
      familyMemberId: 234,
      comment: 'bar foo bar'
    });
    expect(criteria.isFit(transaction)).toBe(false);
  });

  it('TransactionCriteriaService comment 3', () => {
    const params: Params = { comment: 'foo' };
    criteria.update(params);
    const transaction = new Transaction({
      id: 0,
      created: DateUtils.formatDate(),
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
