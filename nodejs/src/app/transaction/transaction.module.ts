import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { MonthFormatPipe } from '../utils/month-format.pipe';
import { TransactionCriteriaService } from './transaction-criteria.service';
import { TransactionDateComponent } from './transaction-date/transaction-date.component';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { TransactionFutureListComponent } from './transaction-future-list/transaction-future-list.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import { TransactionMonthComponent } from './transaction-month/transaction-month.component';
import { TransactionTemplateDetailComponent } from './transaction-template-detail/transaction-template-detail.component';
import { TransactionTemplateListComponent } from './transaction-template-list/transaction-template-list.component';
import { TransactionYearComponent } from './transaction-year/transaction-year.component';

@NgModule({
  declarations: [
    MonthFormatPipe,
    TransactionDateComponent, TransactionMonthComponent, TransactionYearComponent,
    TransactionDetailComponent, TransactionListComponent,
    TransactionTemplateDetailComponent, TransactionTemplateListComponent,
    TransactionFutureListComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    TransactionCriteriaService, UserDataService
  ]
})
export class TransactionModule {}
