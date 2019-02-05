import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})
export class MainMenuComponent implements OnDestroy {
  private readonly subscription1: Subscription;
  private readonly subscription2: Subscription;

  constructor(private auth: AuthService, private userdata: UserDataService) {
    let isInit = false;
    this.subscription1 = this.userdata.subscribeOnInit(() => isInit = true);
    this.subscription2 = auth.subscribeOnSignIn(() => userdata.refresh(), () => isInit);
  }

  signout() {
    this.auth.signOut();
  }

  ngOnDestroy(): void {
    if (this.subscription1) {
      this.subscription1.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }
  }
}

