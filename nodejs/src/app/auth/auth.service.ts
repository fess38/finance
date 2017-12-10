/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
import { CookieService } from 'ngx-cookie';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import 'rxjs/add/operator/toPromise';


declare let gapi: any;

@Injectable()
export class AuthService {
  constructor(private cookie: CookieService, private http: HttpClient, private router: Router) {
    setInterval(() => {
      if (this.isSignIn()) {
        this.validateToken();
      }
    }, 60000);
  }

  private readonly tokenCookieName: string = 'token';

  isSignIn(): boolean {
    return this.token().length > 0;
  }

  private token(): string {
    let token = this.cookie.get(this.tokenCookieName);
    return token ? token : "";
  }

  validateToken(): void {
    this.http.post('/api/auth/validate', new RefreshToken(this.token()))
      .toPromise()
      .then((data) => {
        if (!data["success"]) {
          this.cookie.remove(this.tokenCookieName);
          this.router.navigate(["login"]);
        }
      })
      .catch((error) => {
        console.error(error.message);
      })
  }

  signInGoogle(callback: () => void) {
    gapi.load('auth2', () => {
      this.googleClientConfig()
        .then((clientConfig) => {
          return gapi.auth2.init(clientConfig).signIn();
        })
        .then((googleUser: gapi.auth2.GoogleUser) => {
          let id_token: string = googleUser.getAuthResponse().id_token;
          return this.auth(new RefreshToken(id_token, AuthType.GOOGLE))
        })
        .then((session: Session) => {
          this.cookie.put(this.tokenCookieName, session.token, { expires: new Date(session.expired) });
          callback();
        })
        .catch((error) => {
          console.error(error);
        })
    })
  }

  private googleClientConfig(): Promise<gapi.auth2.ClientConfig> {
    return this.http.get('/api/auth/google-client-id')
      .toPromise()
      .then((data) => {
        return {
          client_id: data['value'],
          fetch_basic_profile: false,
          scope: 'profile'
        } as gapi.auth2.ClientConfig;
      })
  }

  private auth(refreshToken: RefreshToken): Promise<Session> {
    return this.http.post<Session>('/api/auth', refreshToken).toPromise();
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

