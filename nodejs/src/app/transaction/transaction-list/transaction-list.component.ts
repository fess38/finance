import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Long } from 'protobufjs';
import * as _ from 'underscore';
import { Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';
import { NumberFormatter } from '../../utils/number_formatter';
import { TransactionUtilsService as utils } from '../transaction-utils.service';

@Component({
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  constructor(private userdata: UserDataService,
              private utils: utils,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.utils.setYear(+this.route.snapshot.queryParams.year);
    this.utils.setMonth(+this.route.snapshot.queryParams.month);
  }

  locale(): string {
    return this.userdata.locale();
  }

  formatFilterDate(): string {
    return `${this.utils.year}-${this.utils.month}-01`;
  }

  previousMonth() {
    let year = this.utils.year;
    let month = this.utils.month;

    if (month == 1) {
      month = 12;
      year--;
    } else {
      month--;
    }
    this.router.navigate(['/transaction'], { queryParams: { year: year, month: month } });
  }

  nextMonth() {
    let year = this.utils.year;
    let month = this.utils.month;

    if (month == 12) {
      month = 1;
      year++;
    } else {
      month++;
    }
    this.router.navigate(['/transaction'], { queryParams: { year: year, month: month } });
  }

  transactions() {
    return _.chain(this.userdata.transactions)
      .filter(x => !x.isDeleted)
      .filter(x => utils.filter(x, this.utils.year, this.utils.month))
      .sortBy(x => x.created)
      .reverse()
      .value();
  }

  date(transaction: Transaction): Date {
    return utils.parseDate(transaction.created).date;
  }

  category(transaction: Transaction): string {
    return _.chain(this.userdata.categories)
      .filter(x => x.id == transaction.categoryId)
      .map(x => x.name)
      .value().pop() || 'transaction_detail.transfer';
  }

  formatAmount(transaction: Transaction): string {
    let result = '';
    switch (utils.type(transaction)) {
      case Transaction.Type.INCOME:
        result = NumberFormatter.format(transaction.amountTo);
        result += this.currencySymbol(transaction.accountIdTo);
        break;
      case Transaction.Type.EXPENSE:
        result = NumberFormatter.format(transaction.amountFrom);
        result += this.currencySymbol(transaction.accountIdFrom);
        break;
      case Transaction.Type.TRANSFER:
        result = NumberFormatter.format(transaction.amountFrom);
        result += this.currencySymbol(transaction.accountIdFrom);
        result += ' => ';
        result += NumberFormatter.format(transaction.amountTo);
        result += this.currencySymbol(transaction.accountIdTo);
        break;
      default:
        throw new Error(`Undefined transaction type for transaction ${transaction.id}`);
    }
    return result;
  }

  private currencySymbol(accountId: number | Long): string {
    const account = this.userdata.accounts.filter(x => x.id == accountId)[0];
    let symbol: string;
    if (this.userdata.currencies.length > 0) {
      symbol = this.userdata.currencies
        .filter(x => x.id == account.currencyId)
        .map(x => x.symbol)[0];
    }
    if (symbol == null) {
      symbol = '';
    }
    return symbol;
  }
}
