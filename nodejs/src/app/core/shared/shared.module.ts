import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../../app-routing.module';
import { AlertModule } from '../../utils/alert/alert.module';

@NgModule({
  imports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule, TranslateModule
  ],
  exports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule, TranslateModule
  ]
})
export class SharedModule {}
