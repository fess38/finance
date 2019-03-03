import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Long } from 'protobufjs';
import * as _ from 'underscore';
import { Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';
import { NumberFormatter } from '../../utils/number_formatter';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtilsService } from '../transaction-utils.service';

@Component({
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.criteria.update(this.route.snapshot.queryParams);
  }

  locale(): string {
    return this.userdata.locale();
  }

  formatFilterDate(): string {
    return `${this.criteria.year}-${this.criteria.month}-01`;
  }

  previousMonth(): void {
    if (this.criteria.month == 1) {
      this.criteria.month = 12;
      this.criteria.year--;
    } else {
      this.criteria.month--;
    }
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
  }

  nextMonth(): void {
    if (this.criteria.month == 12) {
      this.criteria.month = 1;
      this.criteria.year++;
    } else {
      this.criteria.month++;
    }
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
  }

  transactions(): Transaction[] {
    return _.chain(this.userdata.transactions)
      .filter(x => !x.isDeleted)
      .filter(x => this.criteria.isFit(x))
      .sortBy(x => x.created)
      .reverse()
      .value();
  }

  date(transaction: Transaction): Date {
    return TransactionUtilsService.parseDate(transaction.created).date;
  }

  category(transaction: Transaction): string {
    return _.chain(this.userdata.categories)
      .filter(x => x.id == transaction.categoryId)
      .map(x => x.name)
      .value().pop() || 'transaction_detail.transfer';
  }

  formatAmount(transaction: Transaction): string {
    let result = '';
    switch (TransactionUtilsService.type(transaction)) {
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
