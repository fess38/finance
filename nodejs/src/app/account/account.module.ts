import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AlertComponent } from '../alert/alert.component';
import { AlertService } from '../alert/alert.service';
import { HttpService } from '../utils/http.service';
import { UserdataService } from '../utils/userdata.service';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent, AlertComponent
  ],
  imports: [
    BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    AlertService, HttpService, UserdataService
  ]
})
export class AccountModule {}
