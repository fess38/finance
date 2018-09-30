import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'main-menu',
  templateUrl: 'main-menu.component.html'
})
export class MainMenuComponent {
  constructor(private auth: AuthService) { }

  signout() {
    this.auth.signOut();
  }
}

