import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { TransactionCriteriaService } from './transaction-criteria.service';
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
    TransactionCriteriaService, UserDataService
  ]
})
export class TransactionModule {}
