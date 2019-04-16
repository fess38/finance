import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency, Settings } from '../model/model';
import { UserDataService } from '../user-data/user-data.service';
import Language = Settings.Language;

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  settings: Settings = new Settings();
  languages: any[] = [{ code: Language.RU, value: 'RU' }, { code: Language.EN, value: 'EN' }];

  constructor(private userdata: UserDataService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnInit(() => {
      this.settings = this.userdata.settings();
    });
  }

  currencies(): Currency[] {
    return this.userdata.currencies();
  }

  language(): string {
    return Language[this.userdata.settings().language];
  }

  updateSettings() {
    this.userdata.updateSettings(this.settings)
      .catch(error => {
        console.error(error.message);
        this.router.navigate(['/error']);
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
