import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data.service';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  declarations: [
    AccountListComponent, AccountDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class AccountModule {}
