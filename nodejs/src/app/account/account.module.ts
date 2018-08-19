import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from '../app-routing.module';
import { UserDataService } from '../utils/user-data.service';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountListComponent } from './account-list/account-list.component';

@NgModule({
  declarations: [
    AccountListComponent, AccountDetailComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    UserDataService
  ]
})
export class AccountModule {}
