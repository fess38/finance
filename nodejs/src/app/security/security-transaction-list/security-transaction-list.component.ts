import { Component } from '@angular/core';
import { Security, SecurityTransaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { SecurityUtils } from '../security-utils';
import Type = SecurityTransaction.Type;

@Component({
  templateUrl: 'security-transaction-list.component.html'
})
export class SecurityTransactionListComponent {
  constructor(private userdata: UserDataService) {}

  filterSecurityId: number;

  securities(): Security[] {
    return this.userdata.securities()
      .filter(x => x.transactionAmount > 0)
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  typesWithNames(): any[] {
    return SecurityUtils.typesWithLabels;
  }

  transactions(): SecurityTransaction[] {
    let result = this.userdata.securityTransactions()
      .sort((a, b) => {
        return a.date + a.id.toString() < b.date + b.id.toString() ? 1 : -1;
      });

    if (this.filterSecurityId != null) {
      result = result.filter(x => x.securityId == this.filterSecurityId);
    }
    return result;
  }

  securityName(securityTransaction: SecurityTransaction): string {
    return this.userdata.findSecurity(securityTransaction.securityId).name;
  }

  typeName(securityTransaction: SecurityTransaction): string {
    let name;
    this.typesWithNames().forEach((x) => {
      if (x.type == securityTransaction.type) {
        name = x.label;
      }
    });
    return name;
  }

  amount(securityTransaction: SecurityTransaction): string {
    if (securityTransaction.type == Type.BUY || securityTransaction.type == Type.SELL) {
      return String(securityTransaction.amount);
    } else {
      return '';
    }
  }

  income(securityTransaction: SecurityTransaction): number {
    return SecurityUtils.income(securityTransaction);
  }

  expense(securityTransaction: SecurityTransaction): number {
    return SecurityUtils.expense(securityTransaction);
  }
}
