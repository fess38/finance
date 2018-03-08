/// <reference path="../../../node_modules/@types/gapi/index.d.ts" />
/// <reference path="../../../node_modules/@types/gapi.auth2/index.d.ts" />
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Writer } from 'protobufjs';
import 'rxjs/add/operator/toPromise';
import { AccessToken, RefreshToken } from '../model';
import { google } from '../wrappers';
import BoolValue = google.protobuf.BoolValue;
import StringValue = google.protobuf.StringValue;
import AuthType = RefreshToken.AuthType;

declare let gapi: any;

@Injectable()
export class AuthService {
  constructor(private cookie: CookieService, private http: HttpClient, private router: Router) {
    setTimeout(() => this.validateToken(), 5000);
  }

  private readonly tokenCookieName = 'token';
  private loginTryCounter = 0;
  private readonly options: any = {
    responseType: 'arraybuffer',
    headers: new HttpHeaders({ 'Content-Type': 'application/x-protobuf' })
  };

  isSignIn(): boolean {
    return this.token().length > 0;
  }

  private token(): string {
    const token = this.cookie.get(this.tokenCookieName);
    return token ? token : '';
  }

  validateToken(): void {
    const accessToken = new AccessToken({ value: this.token() });
    const body = this.encode(AccessToken.encode(accessToken));
    this.http.post('/api/auth/validate', body, this.options)
      .toPromise()
      .then((data: ArrayBuffer) => {
        const success: boolean = BoolValue.decode(new Uint8Array(data)).value;
        if (!success) {
          this.cookie.remove(this.tokenCookieName);
          this.router.navigate(['login']);
        }
      })
      .catch((error) => console.error(error.message));
  }

  signInGoogle() {
    gapi.load('auth2', () => {
      this.getGoogleClientConfig()
        .then((clientConfig) => gapi.auth2.init(clientConfig).signIn())
        .then((googleUser: gapi.auth2.GoogleUser) => {
          const token: string = googleUser.getAuthResponse().id_token;
          return this.auth(new RefreshToken({ value: token, type: AuthType.GOOGLE }));
        })
        .then((accessToken: AccessToken) => {
          const options = { expires: new Date(accessToken.expired as number) };
          this.cookie.put(this.tokenCookieName, accessToken.value, options);
          this.router.navigate(['']);
        })
        .catch((error) => {
          console.error(error);
          if (this.loginTryCounter++ < 1) {
            this.signInGoogle();
          }
        });
    });
  }

  private getGoogleClientConfig(): Promise<gapi.auth2.ClientConfig> {
    return this.http.get('/api/auth/google-client-id', this.options)
      .toPromise()
      .then((data: ArrayBuffer) => {
        return {
          client_id: StringValue.decode(new Uint8Array(data)).value,
          fetch_basic_profile: false,
          scope: 'profile',
          ux_mode: 'popup'
        } as gapi.auth2.ClientConfig;
      });
  }

  private auth(refreshToken: RefreshToken): Promise<AccessToken> {
    const body = this.encode(RefreshToken.encode(refreshToken));
    return this.http.post('/api/auth', body, this.options)
      .toPromise()
      .then((data: ArrayBuffer) => {
        return AccessToken.decode(new Uint8Array(data));
      });
  }

  signOut() {
    const accessToken = new AccessToken({ value: this.token() });
    const body = this.encode(AccessToken.encode(accessToken));
    this.http.post('/api/auth/revoke-token', body, this.options)
      .toPromise()
      .then(() => {
        this.cookie.remove(this.tokenCookieName);
        this.router.navigate(['login']);
      })
      .catch((error) => console.error(error.message));
  }

  private encode(value: Writer) {
    const array = value.finish();
    const length = array.byteLength;
    const offcet = array.byteOffset;
    return array.buffer.slice(offcet, offcet + length);
  }
}
