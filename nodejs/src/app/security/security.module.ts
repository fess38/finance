import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { SecurityDetailComponent } from './security-detail/security-detail.component';
import { SecurityListComponent } from './security-list/security-list.component';
import { SecurityReportComponent } from './security-report/security-report.component';
import { SecurityTransactionDetailComponent } from './security-transaction-detail/security-transaction-detail.component';
import { SecurityTransactionListComponent } from './security-transaction-list/security-transaction-list.component';

@NgModule({
  declarations: [
    SecurityListComponent,
    SecurityDetailComponent,
    SecurityTransactionListComponent,
    SecurityTransactionDetailComponent,
    SecurityReportComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class SecurityModule {}
