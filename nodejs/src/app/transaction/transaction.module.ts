import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data.service';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';

@NgModule({
  declarations: [
    TransactionDetailComponent, TransactionListComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class TransactionModule {}
