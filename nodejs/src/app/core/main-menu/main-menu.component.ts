import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})
export class MainMenuComponent {
  constructor(private auth: AuthService, private userdata: UserDataService) {
    auth.subscribeOnSignIn(() => userdata.refresh(0));
  }

  signout() {
    this.auth.signOut();
  }
}

