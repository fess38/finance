import { Component, OnInit } from '@angular/core';
import { AppMode, TransactionTemplate } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'transaction-template-list.component.html'
})
export class TransactionTemplateListComponent implements OnInit {
  constructor(private userdata: UserDataService) {}

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
  }

  transactionTemplates(): TransactionTemplate[] {
    return this.userdata.transactionTemplates().sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });
  }
}
