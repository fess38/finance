/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import 'rxjs/add/operator/toPromise';

declare let gapi: any;

@Injectable()
export class AuthService {
  constructor(private cookie: CookieService, private http: HttpClient, private router: Router) {
    setTimeout(() => this.validateToken(), 5000);
    setInterval(() => { if (this.isSignIn()) this.validateToken(); }, 300000);
    this.getGoogleClientConfig()
      .then((clientConfig) => this.googleClientConfig = clientConfig)
      .catch((error) => console.error(error));
  }

  private readonly tokenCookieName: string = 'token';
  private googleClientConfig: gapi.auth2.ClientConfig;

  isSignIn(): boolean {
    return this.token().length > 0;
  }

  private token(): string {
    const token = this.cookie.get(this.tokenCookieName);
    return token ? token : '';
  }

  validateToken(): void {
    this.http.post('/api/auth/validate', new RefreshToken(this.token()))
      .toPromise()
      .then((data) => {
        if (!data['success']) {
          this.cookie.remove(this.tokenCookieName);
          this.router.navigate(['login']);
        }
      })
      .catch((error) => console.error(error.message));
  }

  signInGoogle() {
    gapi.load('auth2', () => {
      gapi.auth2.init(this.googleClientConfig).signIn()
        .then((googleUser: gapi.auth2.GoogleUser) => {
          const id_token: string = googleUser.getAuthResponse().id_token;
          return this.auth(new RefreshToken(id_token, AuthType.GOOGLE));
        })
        .then((session: Session) => {
          const options = { expires: new Date(session.expired) };
          this.cookie.put(this.tokenCookieName, session.token, options);
          this.router.navigate(['']);
        })
        .catch((error) => {
          console.error(error);
          this.signInGoogle();
        });
    });
  }

  private getGoogleClientConfig(): Promise<gapi.auth2.ClientConfig> {
    return this.http.get('/api/auth/google-client-id')
      .toPromise()
      .then((data) => {
        return {
          client_id: data['value'],
          fetch_basic_profile: false,
          scope: 'profile',
          ux_mode: 'popup'
        } as gapi.auth2.ClientConfig;
      });
  }

  private auth(refreshToken: RefreshToken): Promise<Session> {
    return this.http.post<Session>('/api/auth', refreshToken).toPromise();
  }

  signOut() {
    this.http.post('/api/auth/revoke-token', new RefreshToken(this.token()))
      .toPromise()
      .then(() => {
        this.cookie.remove(this.tokenCookieName);
        this.router.navigate(['login']);
      })
      .catch((error) => console.error(error.message));
  }
}

class RefreshToken {
  token: string;
  type: AuthType;

  constructor(token: string, type: AuthType = AuthType.UNKNOWN) {
    this.token = token;
    this.type = type;
  }
}

class Session {
  token: string;
  expired: number;
}

enum AuthType {
  GOOGLE = 'GOOGLE',
  FACEBOOK = 'FACEBOOK',
  VK = 'VK',
  UNKNOWN = 'UNKNOWN'
}

