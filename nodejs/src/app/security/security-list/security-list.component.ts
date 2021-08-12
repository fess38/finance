import { Component } from '@angular/core';
import { Security } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { SecurityUtils } from '../security-utils';

@Component({
  templateUrl: 'security-list.component.html'
})
export class SecurityListComponent {
  constructor(private userdata: UserDataService) {}

  securities(): Security[] {
    return this.userdata.securities().sort((a, b) => a.name < b.name ? -1 : 1);
  }

  cost(security: Security): number {
    return SecurityUtils.moneyToNumber(security.price)
      * SecurityUtils.moneyToNumber(security.exchangeRate)
      * security.amount;
  }
}
