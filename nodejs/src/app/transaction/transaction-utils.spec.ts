import { Transaction } from '../core/model/model';

import { TransactionUtils } from './transaction-utils';

describe('TransactionUtilsService', () => {
  let transactionTemplate;

  beforeEach(() => {
    transactionTemplate = new Transaction({
      created: '2019-01-01',
      accountIdFrom: 10,
      accountIdTo: 11,
      amountFrom: 100,
      amountTo: 101,
      categoryId: 200
    });
  });

  it('should be INCOME', () => {
    transactionTemplate.accountIdFrom = -1;
    expect(Transaction.Type.INCOME).toEqual(TransactionUtils.type(transactionTemplate));
  });

  it('should be EXPENSE', () => {
    transactionTemplate.accountIdTo = -1;
    expect(Transaction.Type.EXPENSE).toEqual(TransactionUtils.type(transactionTemplate));
  });

  it('should be TRANSFER', () => {
    expect(Transaction.Type.TRANSFER).toEqual(TransactionUtils.type(transactionTemplate));
  });

  it('should be UNDEFINED', () => {
    transactionTemplate.accountIdFrom = -1;
    transactionTemplate.accountIdTo = -1;
    expect(Transaction.Type.UNDEFINED).toEqual(TransactionUtils.type(transactionTemplate));
  });
});
