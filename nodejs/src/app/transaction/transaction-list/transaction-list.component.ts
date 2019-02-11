import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import { Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';
import { TransactionUtilsService as utils } from '../transaction-utils.service';

@Component({
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  private year: number;
  private month: number;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.year = +this.route.snapshot.queryParams.year || utils.currentYear();
    this.month = +this.route.snapshot.queryParams.month || utils.currentMonth();
  }

  locale(): string {
    return this.userdata.locale();
  }

  formatFilterDate(): string {
    return `${this.year}-${this.month}-01`;
  }

  previousMonth() {
    let year = this.year;
    let month = this.month;

    if (month == 1) {
      month = 12;
      year--;
    } else {
      month--;
    }
    this.router.navigate(['/transaction'], { queryParams: { year: year, month: month } });
  }

  nextMonth() {
    let year = this.year;
    let month = this.month;

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
      .filter(x => utils.filter(x, this.year, this.month))
      .sortBy(x => x.created)
      .reverse()
      .sortBy(x => x.id)
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

  amount(transaction: Transaction): string {
    let result = '';
    switch (utils.type(transaction)) {
      case Transaction.Type.INCOME:
        result = String(transaction.amountTo);
        break;
      case Transaction.Type.EXPENSE:
        result = String(transaction.amountFrom);
        break;
      case  Transaction.Type.TRANSFER:
        result = `${String(transaction.amountFrom)} => ${String(transaction.amountTo)}`;
        break;
      default:
        throw new Error(`Undefined transaction type for transaction ${transaction.id}`);
    }
    return result;

  }
}
