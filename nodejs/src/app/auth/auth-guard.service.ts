import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isSignIn: boolean = this.auth.isSignIn();
    if (!isSignIn) {
      this.router.navigate(['login']);
    }
    return isSignIn;
  }
}
