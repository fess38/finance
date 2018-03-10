import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AlertModule } from '../alert/alert.module';
import { HttpService } from '../utils/http.service';
import { UserdataService } from '../utils/userdata.service';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    AlertModule, HttpClientModule
  ],
  providers: [
    AuthService, AuthGuardService, HttpService, UserdataService
  ]
})
export class AuthModule {}
