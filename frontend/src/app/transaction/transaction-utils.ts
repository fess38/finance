import { Category, Currency, SubCategory, Summary, Transaction } from '../core/model/model';
import { UserDataService } from '../core/user-data/user-data.service';
import Type = Transaction.Type;

export class TransactionUtils {
  static typesWithLabels = [
    { type: Type.INCOME, label: 'common.income' },
    { type: Type.EXPENSE, label: 'common.expense' },
    { type: Type.TRANSFER, label: 'transaction.transfer' }
  ];

  static type(transaction: Transaction): Type {
    let type = Type.UNDEFINED;
    if (transaction.accountIdFrom == -1 && transaction.accountIdTo > 0) {
      type = Type.INCOME;
    } else if (transaction.accountIdFrom > 0 && transaction.accountIdTo == -1) {
      type = Type.EXPENSE;
    } else if (transaction.accountIdFrom > 0 && transaction.accountIdTo > 0) {
      type = Type.TRANSFER;
    }
    return type;
  }

  static currencies(transactions: Transaction[], userdata: UserDataService): Currency[] {
    const unique = new Set<number>();
    transactions
      .map(x => Math.max(Number(x.accountIdFrom), Number(x.accountIdTo)))
      .forEach(x => unique.add(x));
    return Array.from(unique)
      .map(x => userdata.findAccount(x).currencyId)
      .map(x => userdata.findCurrency(x));
  }

  static categories(transactions: Transaction[], userdata: UserDataService): Category[] {
    const unique = new Set<number>();
    transactions.map(x => x.categoryId).forEach(x => unique.add(x));
    return Array.from(unique)
      .map(x => userdata.findCategory(x))
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  static subCategories(transactions: Transaction[], userdata: UserDataService): SubCategory[] {
    const unique = new Set<number>();
    transactions.map(x => x.subCategoryId).filter(x => x > 0).forEach(x => unique.add(x));
    return Array.from(unique)
      .map(x => userdata.findSubCategory(x))
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  static income(transactions: Transaction[]): number {
    return transactions.map(x => Number(x.amountTo)).reduce((a, b) => a + b, 0);
  }

  static expense(transactions: Transaction[]): number {
    return transactions
      .map(x => Number(x.amountFrom))
      .reduce((a, b) => a + b, 0);
  }

  static incomeTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.filter(x => TransactionUtils.type(x) == Type.INCOME);
  }

  static expenseTransactions(transactions: Transaction[]): Transaction[] {
    return transactions.filter(x => TransactionUtils.type(x) == Type.EXPENSE);
  }

  static categorySummaries(transactions: Transaction[], income: number,
                           expense: number): Map<number, Summary> {
    const result = new Map<number, Summary>();
    const group = new Map<number, Transaction[]>();
    transactions.forEach(x => group.set(x.categoryId, (group.get(x.categoryId) || []).concat(x)));
    group.forEach((value, key) => {
      const amount: number = value
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((a, b) => a + b, 0);
      const sum = this.type(value[0]) == Type.INCOME ? income : expense;
      result.set(+key, new Summary({ amount: amount, share: amount / sum }));
    });
    return result;
  }

  static subCategorySummaries(transactions: Transaction[], income: number,
                              expense: number): Map<number, Summary> {
    const result = new Map<number, Summary>();
    const group = new Map<number, Transaction[]>();
    transactions
      .filter(x => x.subCategoryId > 0)
      .forEach(x => group.set(x.subCategoryId, (group.get(x.subCategoryId) || []).concat(x)));
    group.forEach((value, key) => {
      const amount: number = value
        .map(x => Math.abs(Number(x.amountFrom)) + Math.abs(Number(x.amountTo)))
        .reduce((a, b) => a + b, 0);
      const sum = this.type(value[0]) == Type.INCOME ? income : expense;
      result.set(+key, new Summary({ amount: amount, share: amount / sum }));
    });
    return result;
  }
}
