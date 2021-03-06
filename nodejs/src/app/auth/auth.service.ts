/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { of, range, Subscription } from 'rxjs';
import { concatMap, delay, filter, takeWhile } from 'rxjs/operators';
import { AccessToken, RefreshToken } from '../core/model/model';
import { google } from '../core/model/wrappers';
import { AlertService } from '../utils/alert/alert.service';
import { HttpService } from '../utils/http.service';
import BoolValue = google.protobuf.BoolValue;
import StringValue = google.protobuf.StringValue;
import AuthType = RefreshToken.AuthType;

declare let gapi: any;

@Injectable()
export class AuthService {
  constructor(private cookie: CookieService,
              private http: HttpService,
              private router: Router,
              private alertService: AlertService) {
    range(0, 100)
      .pipe(concatMap(this.delayFunction))
      .pipe(filter(() => this.hasToken()))
      .pipe(takeWhile(() => !this.isSignIn()))
      .subscribe(() => this.validateToken(this.token()));
  }

  private loginTryCounter = 0;
  private isValidToken = false;
  private delayFunction = (x: number) => of(x).pipe(delay(Math.sqrt(x) * 1000));

  subscribeOnSignIn(callback, hasActiveAttemptCallback = () => false): Subscription {
    return range(1, 100)
      .pipe(concatMap(this.delayFunction))
      .pipe(filter(() => this.isSignIn() && !hasActiveAttemptCallback()))
      .pipe(takeWhile(() => !hasActiveAttemptCallback()))
      .subscribe(() => callback());
  }

  hasToken(): boolean {
    return this.token().length > 0;
  }

  validateToken(token): void {
    if (!this.hasToken()) {
      this.cookie.put('token', token);
    }
    const accessToken = new AccessToken({ value: token });
    this.http.post('/api/auth/validate', AccessToken.encode(accessToken))
      .then(data => {
        this.isValidToken = BoolValue.decode(data).value;
        if (!this.isValidToken) {
          this.signOut();
        }
      })
      .catch(error => {
        console.error(error.message);
      });
  }

  private isSignIn(): boolean {
    return this.hasToken() && this.isValidToken;
  }

  signInGoogle(): void {
    gapi.load('auth2', () => {
      this.getGoogleClientConfig()
        .then(clientConfig => gapi.auth2.init(clientConfig).signIn())
        .then((googleUser: gapi.auth2.GoogleUser) => {
          const token: string = googleUser.getAuthResponse().id_token;
          return this.auth(new RefreshToken({ value: token, type: AuthType.GOOGLE }));
        })
        .then((accessToken: AccessToken) => {
          const options = { expires: new Date(accessToken.expired as number) };
          this.cookie.put('token', accessToken.value, options);
          this.router.navigate(['']);
        })
        .catch(error => {
          const message: string = error.error;
          if (message == 'popup_blocked_by_browser') {
            this.alertService.error('error.popup_blocked');
          } else if (this.loginTryCounter++ < 1) {
            this.signInGoogle();
          } else {
            console.error(error);
            this.router.navigate(['/error']);
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
      .then(data => AccessToken.decode(data));
  }

  signOut(): void {
    if (this.hasToken()) {
      const accessToken = new AccessToken({ value: this.token() });
      this.http.post('/api/auth/revoke-token', AccessToken.encode(accessToken))
        .then(() => {
          this.cookie.remove('token');
          this.router.navigate(['login']);
        })
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  token(): string {
    return this.cookie.get('token') || '';
  }
}
