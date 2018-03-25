import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClarityModule } from 'clarity-angular';
import { CookieModule } from 'ngx-cookie';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { AlertModule } from './alert/alert.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { FamilyMemberModule } from './family-member/family-member.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainPageComponent } from './main-page/main-page.component';

@NgModule({
  declarations: [
    AppComponent, MainMenuComponent, MainPageComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, ClarityModule, CookieModule.forRoot(),
    FormsModule, HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AccountModule, AlertModule, AppRoutingModule, AuthModule, FamilyMemberModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
