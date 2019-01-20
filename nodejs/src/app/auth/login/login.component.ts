import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.auth.validateToken(token);
    }
    if (this.auth.isSignIn()) {
      this.router.navigate(['']);
    }
  }

  signInGoogle() {
    this.auth.signInGoogle();
  }
}
