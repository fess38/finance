import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CookieModule } from 'ngx-cookie';
import { AlertModule } from '../utils/alert/alert.module';
import { HttpService } from '../utils/http.service';
import { AccessLinkComponent } from './access-link/access-link.component';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { GoogleLoginComponent } from './login/google-login.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AccessLinkComponent, GoogleLoginComponent, LoginComponent
  ],
  imports: [
    AlertModule, CookieModule.forRoot(), HttpClientModule, TranslateModule
  ],
  providers: [
    AuthService, AuthGuardService, HttpService
  ]
})
export class AuthModule {}
