import { Date_, Month, Year } from '../core/model/model';

export class DateUtils {
  static parseDate(yyyymmdd: string): Date {
    const tokens = yyyymmdd.split('-');
    return new Date(+tokens[0], +tokens[1] - 1, +tokens[2]);
  }

  static parseDate_(yyyymmdd: string): Date_ {
    const tokens = yyyymmdd.split('-');
    return new Date_({ year: +tokens[0], month: +tokens[1], day: +tokens[2] });
  }

  static parseMonth(yyyymmdd: string): Month {
    const tokens = yyyymmdd.split('-');
    return new Month({ year: +tokens[0], month: +tokens[1] });
  }

  static parseYear(yyyymmdd: string): Year {
    return new Year({ value: +yyyymmdd.split('-')[0] });
  }

  static formatDate(date: Date = new Date()): string {
    let month = String(date.getMonth() + 1);
    month = (month.length == 1 ? '0' : '') + month;
    let day = String(date.getDate());
    day = (day.length == 1 ? '0' : '') + day;
    return `${date.getFullYear()}-${month}-${day}`;
  }

  static formatDate_(date: Date_): string {
    let month = String(date.month);
    month = (month.length == 1 ? '0' : '') + month;
    let day = String(date.day);
    day = (day.length == 1 ? '0' : '') + day;
    return `${date.year}-${month}-${day}`;
  }

  static formatMonth(month: Month): string {
    return `${month.year}-${month.month}-01`;
  }

  static formatYear(year: Year): string {
    return `${year.value}-01-01`;
  }

  static parseAndFormatMonth(yyyymmdd: string): string {
    return this.formatMonth(this.parseMonth(yyyymmdd));
  }

  static currentYear(): number {
    return +this.formatDate().split('-')[0];
  }

  static currentMonth(): number {
    return +this.formatDate().split('-')[1];
  }

  static dates(year: number, month: number): Date_[] {
    const dates: Date_[] = [];
    const daysInMonth: number = new Date(year, month, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
      dates.push(new Date_({ year: year, month: month, day: i }));
    }
    return dates;
  }

  static months(year: number): Month[] {
    const months: Month[] = [];
    for (let i = 1; i <= 12; i++) {
      months.push(new Month({ year: year, month: i }));
    }
    return months;
  }
}
