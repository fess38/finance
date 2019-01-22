import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})
export class MainMenuComponent implements OnDestroy {
  constructor(private auth: AuthService, private userdata: UserDataService) {
    let isInit = false;
    this.subscription = this.userdata.subscribeOnInit(() => isInit = true);
    auth.subscribeOnSignIn(() => userdata.refresh(), () => isInit);
  }

  private readonly subscription: Subscription;

  signout() {
    this.auth.signOut();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

