import { Transaction } from '../core/model/model';

export class TransactionUtilsService {
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

  static currentDate(date: Date = new Date()): string {
    let month = String(date.getMonth() + 1);
    month = (month.length == 1 ? '0' : '') + month;
    let day = String(date.getDate());
    day = (day.length == 1 ? '0' : '') + day;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  static currentYear(): number {
    return this.parseDate(this.currentDate()).year;
  }

  static currentMonth(): number {
    return this.parseDate(this.currentDate()).month;
  }

  static parseDate(dateString: string): SimpleDate {
    const tokens = dateString.split('-');
    const date = new Date(+tokens[0], +tokens[1] - 1, +tokens[2]);
    return new SimpleDate({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      date: date
    });
  }
}

export class SimpleDate {
  readonly year: number;
  readonly month: number;
  readonly day: number;
  readonly date: Date;

  constructor(any) {
    this.year = any.year;
    this.month = any.month;
    this.day = any.day;
    this.date = any.date;
  }
}
