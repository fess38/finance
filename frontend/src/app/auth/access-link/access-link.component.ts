import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: 'access-link.component.html'
})
export class AccessLinkComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  link = '';

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token') || '';
    if (this.auth.hasToken()) {
      if (token == 'create_link') {
        this.link = '/access_link/' + this.auth.token();
      } else {
        setTimeout(() => this.router.navigate(['/']), 15000);
      }
    } else {
      this.auth.validateToken(token);
      this.subscription = this.auth.subscribeOnSignIn(() => this.router.navigate(['/']));
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
