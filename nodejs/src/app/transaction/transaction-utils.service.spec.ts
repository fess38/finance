import { Transaction } from '../core/model/model';

import { TransactionUtilsService as utils } from './transaction-utils.service';

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
    expect(Transaction.Type.INCOME).toEqual(utils.type(transactionTemplate));
  });

  it('should be EXPENSE', () => {
    transactionTemplate.accountIdTo = -1;
    expect(Transaction.Type.EXPENSE).toEqual(utils.type(transactionTemplate));
  });

  it('should be TRANSFER', () => {
    expect(Transaction.Type.TRANSFER).toEqual(utils.type(transactionTemplate));
  });

  it('should be UNDEFINED', () => {
    transactionTemplate.accountIdFrom = -1;
    transactionTemplate.accountIdTo = -1;
    expect(Transaction.Type.UNDEFINED).toEqual(utils.type(transactionTemplate));
  });

  it('should return 2019-01-12 date', () => {
    const actual = utils.currentDate(new Date(2019, 0, 12, 1, 0, 0));
    expect('2019-01-12').toEqual(actual);
  });

  it('should return 2019-01-01 date', () => {
    const actual = utils.currentDate(new Date(2019, 0, 1, 1, 0, 0));
    expect('2019-01-01').toEqual(actual);
  });

  it('should return 2019-01-05', () => {
    const expected = { year: 2019, month: 1, day: 5 };
    expect(expected).toEqual(utils.parseDate('2019-01-05'));
  });
});
