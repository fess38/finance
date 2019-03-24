import * as _ from 'underscore';
import { Category, Currency, Transaction } from '../core/model/model';
import { UserDataService } from '../core/user-data/user-data.service';

export class TransactionUtils {
  static type(transaction: Transaction): Transaction.Type {
    let type: Transaction.Type = Transaction.Type.UNDEFINED;
    if (transaction.accountIdFrom == -1 && transaction.accountIdTo > 0) {
      type = Transaction.Type.INCOME;
    } else if (transaction.accountIdFrom > 0 && transaction.accountIdTo == -1) {
      type = Transaction.Type.EXPENSE;
    } else if (transaction.accountIdFrom > 0 && transaction.accountIdTo > 0) {
      type = Transaction.Type.TRANSFER;
    }
    return type;
  }

  static currencies(transactions: Transaction[], userdata: UserDataService): Currency[] {
    return _.chain(transactions)
      .map(x => Math.max(Number(x.accountIdFrom), Number(x.accountIdTo)))
      .unique()
      .map(x => userdata.findAccount(x).currencyId)
      .map(x => userdata.findCurrency(x))
      .value();
  }

  static categories(transactions: Transaction[], userdata: UserDataService): Category[] {
    return _.chain(transactions)
      .map(x => x.categoryId)
      .unique()
      .map(x => userdata.findCategory(x))
      .sortBy(x => x.name)
      .value();
  }

  static income(transactions: Transaction[]): number {
    return _.chain(transactions)
      .map(x => Number(x.amountTo))
      .reduce((x1, x2) => x1 + x2, 0)
      .value();
  }

  static expense(transactions: Transaction[]): number {
    return _.chain(transactions)
      .map(x => Number(x.amountFrom))
      .reduce((x1, x2) => x1 + x2, 0)
      .value();
  }

  static incomeTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.filter(x => TransactionUtils.type(x) == Transaction.Type.INCOME);
  }

  static expenseTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.filter(x => TransactionUtils.type(x) == Transaction.Type.EXPENSE);
  }

  static dateSummaries(transactions: Transaction[]): Map<string, number> {
    const result = new Map<string, number>();
    const value = _.chain(transactions).groupBy(x => x.created).value();
    for (let key in value) {
      const amount: number = _.chain(value[key])
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0)
        .value();
      result.set(key, amount);
    }
    return result;
  }

  static categorySummaries(transactions: Transaction[]): Map<number, number> {
    const result = new Map<number, number>();
    const value = _.chain(transactions).groupBy(x => x.categoryId).value();
    for (let key in value) {
      const amount: number = _.chain(value[key])
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((x1, x2) => x1 + x2, 0)
        .value();
      result.set(+key, amount);
    }
    return result;
  }
}
