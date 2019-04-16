import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    if (this.auth.hasToken()) {
      this.router.navigate(['']);
    }
  }

  signInGoogle() {
    this.auth.signInGoogle();
  }
}
