import { Transaction, TransactionTemplate } from '../core/model/model';
import { TransactionTemplateResolver } from './transaction-template-resolver';

describe('TransactionTemplateResolver', () => {
  let resolver = new TransactionTemplateResolver();

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
    expect(resolver.match(transaction1, transaction2)).toBe(true);
  });

  it('should not match', () => {
    const transaction1 = createTransaction(10, '2019-01-01', 1, 2, 0, 0, 3, 40, 5);
    const transaction2 = createTransaction(11, '2019-01-02', 1, 2, 100, 101, 3, 4, 50);
    expect(resolver.match(transaction1, transaction2)).toBe(false);
  });

  it('should return last transaction date 1', () => {
    const defaultTransaction = createTransaction(10, '2019-01-01', 1, 2, 0, 0, 3, 40, 5);
    const transactions: Transaction[] = [];
    const expected = new Date(2019, 0, 1);
    expect(resolver.lastTransactionDate(defaultTransaction, transactions)).toEqual(expected);
  });

  it('should return last transaction date 2', () => {
    const defaultTransaction = createTransaction(10, '2019-01-01', 1, 2, 0, 0, 3, 40, 5);
    const transactions: Transaction[] = [
      createTransaction(10, '2019-02-04', 1, 2, 0, 0, 3, 40, 5),
      createTransaction(11, '2019-01-03', 1, 2, 0, 0, 3, 40, 5),
      createTransaction(11, '2020-01-03', 1, 2, 0, 0, 3, 4, 5)
    ];
    const expected = new Date(2019, 1, 4);
    expect(resolver.lastTransactionDate(defaultTransaction, transactions)).toEqual(expected);
  });

  it('should resolveTransactionTemplate 1', () => {
    const transactionTemplate = TransactionTemplate.create({
      name: 'foo',
      transaction: createTransaction(0, '2019-01-01', 1, 2, 0, 0, 3, 40, 5),
      interval: 1
    });
    const transactions: Transaction[] = [];
    const expected: Transaction[] = [
      createTransaction(0, '2019-01-02', 1, 2, 0, 0, 3, 40, 5)
    ];
    expect(resolver.resolveTransactionTemplate(transactionTemplate, transactions))
      .toEqual(expected);
  });

  it('should resolveTransactionTemplate 2', () => {
    const transactionTemplate = TransactionTemplate.create({
      name: 'foo',
      transaction: createTransaction(0, '2019-01-01', 1, 2, 0, 0, 3, 40, 5),
      interval: 1,
      daysOfWeek: [4, 5],
      daysOfMonth: [2, 3, 4]
    });
    const transactions: Transaction[] = [];
    const expected: Transaction[] = [
      createTransaction(0, '2019-01-02', 1, 2, 0, 0, 3, 40, 5),
      createTransaction(0, '2019-01-03', 1, 2, 0, 0, 3, 40, 5),
      createTransaction(0, '2019-01-04', 1, 2, 0, 0, 3, 40, 5)
    ];
    expect(resolver.resolveTransactionTemplate(transactionTemplate, transactions))
      .toEqual(expected);
  });

  it('should resolveTransactionTemplate 3', () => {
    const transactionTemplate = TransactionTemplate.create({
      name: 'foo',
      transaction: createTransaction(0, '2019-01-01', 1, 2, 0, 0, 3, 40, 5),
      interval: 1,
      daysOfWeek: [4, 5],
      daysOfMonth: [2, 3, 4]
    });
    const transactions: Transaction[] = [
      createTransaction(0, '2019-01-02', 1, 2, 0, 0, 3, 40, 5),
    ];
    const expected: Transaction[] = [
      createTransaction(0, '2019-01-03', 1, 2, 0, 0, 3, 40, 5),
      createTransaction(0, '2019-01-04', 1, 2, 0, 0, 3, 40, 5),
      createTransaction(0, '2019-02-02', 1, 2, 0, 0, 3, 40, 5)
    ];
    expect(resolver.resolveTransactionTemplate(transactionTemplate, transactions))
      .toEqual(expected);
  });

  it('should resolveTransactionTemplate 4', () => {
    const transactionTemplate = TransactionTemplate.create({
      name: 'foo',
      transaction: createTransaction(0, '2019-02-28', 1, 2, 0, 0, 3, 40, 5),
      interval: 0,
      daysOfMonth: [29]
    });
    const transactions: Transaction[] = [];
    const expected: Transaction[] = [
      createTransaction(0, '2019-03-29', 1, 2, 0, 0, 3, 40, 5)
    ];
    expect(resolver.resolveTransactionTemplate(transactionTemplate, transactions))
      .toEqual(expected);
  });
});
