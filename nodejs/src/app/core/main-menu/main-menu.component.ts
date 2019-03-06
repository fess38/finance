import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})
export class MainMenuComponent implements OnDestroy {
  private readonly subscription: Subscription;

  constructor(private auth: AuthService, private userdata: UserDataService) {
    let hasActiveAttempt = false;
    this.userdata.readCache();
    this.subscription = auth.subscribeOnSignIn(
      () => {
        hasActiveAttempt = true;
        userdata.refresh(() => hasActiveAttempt = false);
      },
      () => hasActiveAttempt
    );
  }

  signout(): void {
    this.auth.signOut();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

