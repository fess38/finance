import { Date_, Month, Transaction, Year } from '../core/model/model';

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
    const tokens = this.currentDate().split('-');
    return +tokens[0];
  }

  static currentMonth(): number {
    const tokens = this.currentDate().split('-');
    return +tokens[1];
  }

  static parseDate(yyyymmdd: string): Date_ {
    const tokens = yyyymmdd.split('-');
    return new Date_({
      year: +tokens[0],
      month: +tokens[1],
      day: +tokens[2]
    });
  }

  static parseMonth(yyyymmdd: string): Month {
    const tokens = yyyymmdd.split('-');
    return new Month({
      year: +tokens[0],
      month: +tokens[1]
    });
  }

  static parseYear(yyyymmdd: string): Year {
    return new Year({ value: +yyyymmdd.split('-')[0] });
  }
}
