import { Transaction, TransactionTemplate } from '../core/model/model';
import { DateUtils } from '../utils/date-utils';
import { TransactionMatcher } from './transaction-matcher';

export class TransactionTemplateResolver {
  resolve(transactionTemplates: TransactionTemplate[], transactions: Transaction[])
    : NamedTransaction[] {
    const result: NamedTransaction[] = [];
    transactionTemplates.forEach(x => {
      this.resolveTransactionTemplate(x, transactions).forEach(transaction => {
        result.push({ name: x.name, transaction: transaction });
      });
    });
    return result;
  }

  resolveTransactionTemplate(transactionTemplate: TransactionTemplate, transactions: Transaction[])
    : Transaction[] {
    const dates = new Set<string>();
    const defaultTransaction: Transaction = transactionTemplate.transaction as Transaction;
    const lastTransactionDate: Date = this.lastTransactionDate(defaultTransaction, transactions);
    if (transactionTemplate.interval > 0) {
      dates.add(this.nextDateByInterval(transactionTemplate.interval, lastTransactionDate));
    }
    transactionTemplate.daysOfWeek.forEach(dayOfWeek => {
      dates.add(this.nextDateByDayOfWeek(dayOfWeek, lastTransactionDate));
    });
    transactionTemplate.daysOfMonth.forEach(dayOfMonth => {
      dates.add(this.nextDateByDayOfMonth(dayOfMonth, lastTransactionDate));
    });
    return Array.from(dates)
      .sort((a, b) => a < b ? -1 : 1)
      .map(x => {
        const transaction = new Transaction(defaultTransaction);
        transaction.created = x;
        return transaction;
      });
  }

  lastTransactionDate(defaultTransaction: Transaction, transactions: Transaction[]): Date {
    let result: Date = DateUtils.parseDate(defaultTransaction.created);
    const matchedDates: Date[] = transactions
      .filter(x => TransactionMatcher.match(defaultTransaction, x))
      .map(x => DateUtils.parseDate(x.created))
      .sort((a, b) => a < b ? -1 : 1);
    if (matchedDates.length > 0) {
      const lastMatchedDate: Date = matchedDates[matchedDates.length - 1];
      if (lastMatchedDate > result) {
        result = lastMatchedDate;
      }
    }
    return result;
  }

  private nextDateByInterval(interval: number, lastTransactionDate: Date): string {
    const result = new Date(lastTransactionDate.getTime());
    DateUtils.addDays(result, interval);
    return DateUtils.formatDate(result);
  }

  private nextDateByDayOfWeek(dayOfWeek: number, lastTransactionDate: Date): string {
    const result = new Date(lastTransactionDate.getTime());
    DateUtils.addDays(result, 1);
    while (result.getDay() != dayOfWeek % 7) {
      DateUtils.addDays(result, 1);
    }
    return DateUtils.formatDate(result);
  }

  private nextDateByDayOfMonth(dayOfMonth: number, lastTransactionDate: Date): string {
    const daysInMonth = (date: Date) => {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    };
    const result = new Date(lastTransactionDate.getTime());
    DateUtils.addDays(result, 1);
    let correctedDayOfMonth: number = Math.min(dayOfMonth, daysInMonth(result));
    while (result.getDate() != correctedDayOfMonth) {
      DateUtils.addDays(result, 1);
      correctedDayOfMonth = Math.min(dayOfMonth, daysInMonth(result));
    }
    return DateUtils.formatDate(result);
  }
}

export class NamedTransaction {
  name: string;
  transaction: Transaction;
}
