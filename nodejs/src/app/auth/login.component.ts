import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  template: '<div (click)="signInGoogle()">Google sign in</div>'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  signInGoogle() {
    let redirect = () => { this.router.navigate([""]) };
    this.auth.isSignIn() ? redirect() : this.auth.signInGoogle(redirect);
  }
}
