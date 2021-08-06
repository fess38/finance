import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { SecurityTransactionDetailComponent } from './security-transaction-detail/security-transaction-detail.component';
import { SecurityTransactionListComponent } from './security-transaction-list/security-transaction-list.component';

@NgModule({
  declarations: [
    SecurityTransactionListComponent,
    SecurityTransactionDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class SecurityTransactionModule {}
