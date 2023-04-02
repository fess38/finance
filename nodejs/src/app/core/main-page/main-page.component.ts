import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, concatMap, delay, filter, of, range, takeWhile } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { AppMode } from '../model/model';
import { UserDataService } from '../user-data/user-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main-page.component.html'
})
export class MainPageComponent implements OnInit, OnDestroy {
  constructor(private auth: AuthService, private userdata: UserDataService) {}

  private subscription: Subscription;
  isOnline = false;

  async ngOnInit(): Promise<void> {
    await this.userdata.readCache();
    this.subscription = this.auth.subscribeOnSignIn(() => this.refresh());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private refresh(): void {
    let hasActiveAttempt = false;
    range(0, 100)
      .pipe(concatMap((x: number) => of(x).pipe(delay(Math.sqrt(x) * 1000))))
      .pipe(takeWhile(() => !this.isOnline))
      .pipe(filter(() => !hasActiveAttempt))
      .subscribe(() => {
        hasActiveAttempt = true;
        this.userdata.refresh(() => this.isOnline = true, () => hasActiveAttempt = false);
      });
  }

  isFinance(): boolean {
    return this.userdata.localSettings.appMode == AppMode.FINANCE;
  }

  setFinance(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
  }

  isNotes(): boolean {
    return this.userdata.localSettings.appMode == AppMode.NOTES;
  }

  setNotes(): void {
    this.userdata.localSettings.appMode = AppMode.NOTES;
  }

  signOut(): void {
    this.isOnline = false;
    this.auth.signOut();
    this.userdata.clearDataStorage();
  }
}
