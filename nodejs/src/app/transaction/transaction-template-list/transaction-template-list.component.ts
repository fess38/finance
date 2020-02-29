import { Component } from '@angular/core';
import * as _ from 'underscore';
import { TransactionTemplate } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'transaction-template-list.component.html'
})
export class TransactionTemplateListComponent {
  constructor(private userdata: UserDataService) {}

  transactionTemplates(): TransactionTemplate[] {
    return _.sortBy(this.userdata.transactionTemplates(), x => x.name.toLowerCase());
  }
}
