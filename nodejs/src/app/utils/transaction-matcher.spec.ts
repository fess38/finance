import { Transaction } from '../core/model/model';
import { TransactionMatcher } from './transaction-matcher';

describe('TransactionMatcher', () => {
  const createTransaction = (id: number, created: string, accountIdFrom: number,
                             accountIdTo: number, amountFrom: number, amountTo: number,
                             categoryId: number, subCategoryId: number, familyMemberId: number) => {
    return new Transaction({
      id: id,
      created: created,
      accountIdFrom: accountIdFrom,
      accountIdTo: accountIdTo,
      amountFrom: amountFrom,
      amountTo: amountTo,
      categoryId: categoryId,
      subCategoryId: subCategoryId,
      familyMemberId: familyMemberId
    });
  };

  it('should match', () => {
    const transaction1 = createTransaction(10, '2019-01-01', 1, 2, 0, 0, 3, 4, 5);
    const transaction2 = createTransaction(11, '2019-01-02', 1, 2, 100, 101, 3, 4, 5);
    expect(TransactionMatcher.match(transaction1, transaction2)).toBe(true);
  });

  it('should not match', () => {
    const transaction1 = createTransaction(10, '2019-01-01', 1, 2, 0, 0, 3, 40, 5);
    const transaction2 = createTransaction(11, '2019-01-02', 1, 2, 100, 101, 3, 4, 50);
    expect(TransactionMatcher.match(transaction1, transaction2)).toBe(false);
  });

});
