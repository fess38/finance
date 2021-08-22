import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AppMode } from '../model/model';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private userdata: UserDataService) {}

  private subscription: Subscription;
  private appMode = AppMode.FINANCE;
  isOnline = false;

  ngOnInit(): void {
    let hasActiveAttempt = false;
    this.userdata.readCache();
    this.subscription = this.auth.subscribeOnSignIn(
      () => {
        hasActiveAttempt = true;
        this.userdata.refresh(() => hasActiveAttempt = false);
        this.isOnline = true;
      },
      () => hasActiveAttempt
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isFinance(): boolean {
    return this.appMode == AppMode.FINANCE;
  }

  setFinance() {
    this.appMode = AppMode.FINANCE;
  }

  isNotes(): boolean {
    return this.appMode == AppMode.NOTES;
  }

  setNotes() {
    this.appMode = AppMode.NOTES;
  }

  signout(): void {
    this.auth.signOut();
  }
}
