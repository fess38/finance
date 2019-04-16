import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const hasToken: boolean = this.auth.hasToken();
    if (!hasToken) {
      this.router.navigate(['login']);
    }
    return hasToken;
  }
}
