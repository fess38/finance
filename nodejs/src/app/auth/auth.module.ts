import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CookieModule } from 'ngx-cookie';
import { HttpService } from '../core/http.service';
import { AlertModule } from '../utils/alert/alert.module';
import { AccessLinkComponent } from './access-link/access-link.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AccessLinkComponent, LoginComponent
  ],
  imports: [
    AlertModule, CookieModule.forRoot(), HttpClientModule, TranslateModule
  ],
  providers: [
    AuthService, AuthGuardService, HttpService
  ]
})
export class AuthModule {}
