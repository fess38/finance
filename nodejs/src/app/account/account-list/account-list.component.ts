import { Component } from '@angular/core';
import { Account } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'account-list.component.html'
})
export class AccountListComponent {
  constructor(private userdata: UserDataService) {}

  accounts(): Account[] {
    return this.userdata.accounts().sort((a, b) => a.name < b.name ? -1 : 1);
  }
}
