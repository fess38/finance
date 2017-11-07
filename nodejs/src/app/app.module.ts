import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'angular2-cookie/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LoginComponent } from './auth/login.component';
import { HelloComponent } from './hello.component';

import { AuthService } from './auth/auth.service';
import { CurrencyApiService } from './api/currency-api.service';

import { AuthGuardService } from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent, PageNotFoundComponent, LoginComponent, HelloComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, AppRoutingModule
  ],
  providers: [
    CurrencyApiService, AuthService, AuthGuardService, CookieService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
