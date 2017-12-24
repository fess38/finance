import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AccountComponent } from './account.component';
import { AccountService } from './account.service';
import { CurrencyService } from './currency.service';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    AccountService, CurrencyService
  ]
})
export class AccountModule {}
