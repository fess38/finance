import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  constructor(private auth: AuthService, private router: Router) { }

  signInGoogle() {
    let redirect = () => { this.router.navigate([""]) };
    this.auth.isSignIn() ? redirect() : this.auth.signInGoogle(redirect);
  }
}
