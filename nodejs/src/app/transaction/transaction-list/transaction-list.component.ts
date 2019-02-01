import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'underscore';
import { UserDataService } from '../../core/user-data.service';
import { TransactionUtilsService as utils } from '../transaction-utils.service';

@Component({
  templateUrl: './transaction-list.component.html'
})
export class TransactionListComponent implements OnInit {
  private year: number;
  private month: number;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.year = +this.route.snapshot.queryParams.year || 0;
    this.month = +this.route.snapshot.queryParams.month || 0;
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

  date(dateString: string): Date {
    return utils.parseDate(dateString).date;
  }
}
