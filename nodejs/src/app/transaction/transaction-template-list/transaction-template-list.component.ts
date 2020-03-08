import { Component } from '@angular/core';
import { TransactionTemplate } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'transaction-template-list.component.html'
})
export class TransactionTemplateListComponent {
  constructor(private userdata: UserDataService) {}

  transactionTemplates(): TransactionTemplate[] {
    return this.userdata.transactionTemplates().sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }
}
