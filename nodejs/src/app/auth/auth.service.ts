/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/toPromise';
import { AlertService } from '../alert/alert.service';
import { AccessToken, RefreshToken } from '../model';
import { HttpService } from '../utils/http.service';
import { UserdataService } from '../utils/userdata.service';
import { google } from '../wrappers';
import BoolValue = google.protobuf.BoolValue;
import StringValue = google.protobuf.StringValue;
import AuthType = RefreshToken.AuthType;

declare let gapi: any;

@Injectable()
export class AuthService {
  constructor(private cookie: CookieService,
              private http: HttpService,
              private router: Router,
              private userdataService: UserdataService,
              private alertService: AlertService) {
    setTimeout(() => this.validateToken(), 5000);
  }

  private readonly tokenCookieName = 'token';
  private loginTryCounter = 0;

  isSignIn(): boolean {
    return this.token().length > 0;
  }

  private token(): string {
    const token = this.cookie.get(this.tokenCookieName);
    return token ? token : '';
  }

  validateToken(): void {
    const accessToken = new AccessToken({ value: this.token() });
    this.http.post('/api/auth/validate', AccessToken.encode(accessToken))
      .then(data => {
        const success: boolean = BoolValue.decode(data).value;
        if (!success) {
          this.signOut();
        }
      })
      .catch((error) => console.error(error.message));
  }

  signInGoogle() {
    gapi.load('auth2', () => {
      this.getGoogleClientConfig()
        .then(clientConfig => gapi.auth2.init(clientConfig).signIn())
        .then((googleUser: gapi.auth2.GoogleUser) => {
          const token: string = googleUser.getAuthResponse().id_token;
          return this.auth(new RefreshToken({ value: token, type: AuthType.GOOGLE }));
        })
        .then((accessToken: AccessToken) => {
          const options = { expires: new Date(accessToken.expired as number) };
          this.cookie.put(this.tokenCookieName, accessToken.value, options);
          this.router.navigate(['']);
        })
        .catch(error => {
          const message: string = error.error;
          if (message == 'popup_blocked_by_browser') {
            this.alertService.error('Не удается открыть всплывающее окно');
          } else if (this.loginTryCounter++ < 1) {
            this.signInGoogle();
          }
        });
    });
  }

  private getGoogleClientConfig(): Promise<gapi.auth2.ClientConfig> {
    return this.http.get('/api/auth/google-client-id')
      .then(data => {
        return {
          client_id: StringValue.decode(data).value,
          fetch_basic_profile: false,
          scope: 'profile',
          ux_mode: 'popup'
        } as gapi.auth2.ClientConfig;
      });
  }

  private auth(refreshToken: RefreshToken): Promise<AccessToken> {
    return this.http.post('/api/auth', RefreshToken.encode(refreshToken))
      .then((data) => {
        return AccessToken.decode(data);
      });
  }

  signOut() {
    if (this.isSignIn()) {
      const accessToken = new AccessToken({ value: this.token() });
      this.http.post('/api/auth/revoke-token', AccessToken.encode(accessToken))
        .then(() => {
          this.cookie.remove(this.tokenCookieName);
          this.router.navigate(['login']);
        })
        .then(() => this.userdataService.deleteUserData())
        .catch((error) => console.error(error.message));
    }
  }
}
