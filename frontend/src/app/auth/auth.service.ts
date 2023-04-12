import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { clear } from 'idb-keyval';
import { CookieService } from 'ngx-cookie';
import { Subject, Subscription, of, range } from 'rxjs';
import { concatMap, delay, filter, takeWhile } from 'rxjs/operators';
import { AccessToken, RefreshToken } from '../core/model/model';
import { google } from '../core/model/wrappers';
import { AlertService } from '../utils/alert/alert.service';
import { HttpService } from '../utils/http.service';

import BoolValue = google.protobuf.BoolValue;
import StringValue = google.protobuf.StringValue;
import AuthType = RefreshToken.AuthType;

@Injectable()
export class AuthService {
  constructor(private cookie: CookieService,
              private http: HttpService,
              private router: Router,
              private alertService: AlertService) {
    this.subscribeOnGoogleSignIn();
    this.subscribeOnValidateToken();
  }

  private tokenKey = 'token';
  private googleTokenKey = 'g_csrf_token';
  private isValidToken = false;
  private isSignInSubject = new Subject<void>();

  token(): string {
    return this.cookie.get(this.tokenKey) || '';
  }

  hasToken(): boolean {
    return this.token().length > 0;
  }

  validateToken(token: string, errorCallback = () => {}): void {
    if (!this.hasToken()) {
      this.cookie.put(this.tokenKey, token);
    }

    const accessToken = new AccessToken({ value: this.token() });
    this.http.post('/api/auth/validate', AccessToken.encode(accessToken))
      .then(data => {
        this.isValidToken = BoolValue.decode(data).value;
        if (!this.isValidToken) {
          this.signOut();
        } else {
          this.isSignInSubject.next();
        }
      })
      .catch(error => {
        console.error(error.message);
        errorCallback();
      });
  }

  private isSignIn(): boolean {
    return this.hasToken() && this.isValidToken;
  }

  async googleClientId(): Promise<string> {
    return this.http.get('/api/auth/google-client-id')
      .then(data => StringValue.decode(data).value);
  }

  private signInGoogle(errorCallback = () => {}): void {
    const token = this.cookie.get(this.googleTokenKey);
    const refreshToken = new RefreshToken({ value: token, type: AuthType.GOOGLE });

    this.http.post('/api/auth', RefreshToken.encode(refreshToken))
      .then(async (data) => {
        const accessToken = AccessToken.decode(data);
        const options = { expires: new Date(accessToken.expired) };
        this.cookie.put(this.tokenKey, accessToken.value, options);
        this.cookie.remove(this.googleTokenKey);
        await this.router.navigate(['']);
      })
      .catch(error => {
        console.error(error.message);
        this.alertService.error('error.message');
        errorCallback();
      });
  }

  signOut(): void {
    if (!this.hasToken()) {
      return;
    }

    const accessToken = new AccessToken({ value: this.token() });
    this.http.post('/api/auth/revoke-token', AccessToken.encode(accessToken))
      .then(async () => {
        this.isValidToken = false;
        this.cookie.remove(this.tokenKey);
        await clear();
        this.subscribeOnGoogleSignIn();
        this.subscribeOnValidateToken();
        await this.router.navigate(['login']);
      })
      .catch(error => {
        console.error(error.message);
        this.alertService.error('error.message');
      });
  }

  subscribeOnSignIn(callback: () => void): Subscription {
    return this.isSignInSubject.subscribe(callback);
  }

  private subscribeOnGoogleSignIn(): void {
    let hasActiveAttempt = false;
    range(0, 100)
      .pipe(concatMap((x: number) => of(x).pipe(delay(1000))))
      .pipe(takeWhile(() => !this.hasToken()))
      .pipe(filter(() => !hasActiveAttempt && this.cookie.hasKey(this.googleTokenKey)))
      .subscribe(() => {
        hasActiveAttempt = true;
        this.signInGoogle(() => hasActiveAttempt = false);
      });
  }

  private subscribeOnValidateToken(): void {
    let hasActiveAttempt = false;
    range(0, 100)
      .pipe(concatMap((x: number) => of(x).pipe(delay(1000))))
      .pipe(takeWhile(() => !this.isSignIn()))
      .pipe(filter(() => !hasActiveAttempt && this.hasToken()))
      .subscribe(() => {
        hasActiveAttempt = true;
        this.validateToken(this.token(), () => hasActiveAttempt = false);
      });
  }
}
