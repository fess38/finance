import { Component } from '@angular/core';
import { Security, SecurityTransaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { MoneyEncoderPipe } from '../../utils/money-encoder.pipe';
import { SecurityTransactionUtils } from '../security-transaction-utils';

@Component({
  templateUrl: './security-transaction-list.component.html'
})
export class SecurityTransactionListComponent {
  constructor(private userdata: UserDataService) {}

  private moneyEncoder = new MoneyEncoderPipe();
  filterSecurityId: number;
  filterType: SecurityTransaction.Type;

  locale(): string {
    return this.userdata.locale();
  }

  securities(): Security[] {
    return this.userdata.securities().sort((a, b) => a.name < b.name ? -1 : 1);
  }

  typesWithNames(): any[] {
    return SecurityTransactionUtils.typesWithLabels;
  }

  transactions(): SecurityTransaction[] {
    let result = this.userdata.securityTransactions()
      .sort((a, b) => {
        return a.date + a.id.toString() < b.date + b.id.toString() ? 1 : -1;
      });

    if (this.filterSecurityId != null) {
      result = result.filter(x => x.securityId == this.filterSecurityId);
    }
    if (this.filterType != null) {
      result = result.filter(x => x.type == this.filterType);
    }
    return result;
  }

  securityName(securityTransaction: SecurityTransaction): string {
    return this.userdata.findSecurity(securityTransaction.securityId).name;
  }

  typeName(securityTransaction: SecurityTransaction): string {
    let name;
    SecurityTransactionUtils.typesWithLabels.forEach((x) => {
      if (x.type == securityTransaction.type) {
        name = x.label;
      }
    });
    return name;
  }

  cost(securityTransaction: SecurityTransaction): string {
    const cost = Number(this.moneyEncoder.transform(securityTransaction.price))
      * Number(this.moneyEncoder.transform(securityTransaction.exchangeRate))
      * securityTransaction.amount;
    return String(Math.round(cost));
  }
}
