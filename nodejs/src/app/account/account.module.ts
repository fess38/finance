import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AlertModule } from '../alert/alert.module';
import { HttpService } from '../utils/http.service';
import { UserdataService } from '../utils/userdata.service';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    AlertModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    HttpService, UserdataService
  ]
})
export class AccountModule {}
