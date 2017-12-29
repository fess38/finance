import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { AccountComponent } from './account.component';
import { AccountService } from './account.service';
import { CurrencyService } from './currency.service';

@NgModule({
  declarations: [
    AccountComponent, AlertComponent
  ],
  imports: [
    BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    AccountService, AlertService, CurrencyService
  ]
})
export class AccountModule {}
