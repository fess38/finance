import { Component, OnInit } from '@angular/core';
import { Account, AppMode } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'account-list.component.html'
})
export class AccountListComponent implements OnInit {
  constructor(private userdata: UserDataService) {}

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
  }

  accounts(): Account[] {
    return this.userdata.accounts().sort((a, b) => a.name < b.name ? -1 : 1);
  }
}
