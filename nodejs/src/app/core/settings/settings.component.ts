import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Currency, Settings } from '../model/model';
import { UserDataService } from '../user-data/user-data.service';
import Language = Settings.Language;

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(
    private userdata: UserDataService,
    private router: Router,
    private sanitizer: DomSanitizer) {}

  private subscription: Subscription;
  settings = new Settings();
  languages: any[] = [{ code: Language.RU, value: 'RU' }, { code: Language.EN, value: 'EN' }];
  exportDataUrl: SafeUrl;

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnInit(() => {
      this.settings = this.userdata.settings();
      const blob = new Blob([JSON.stringify(this.userdata.jsonDump())], { type: 'application/json' });
      this.exportDataUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isReadOnly(): boolean {
    return this.userdata.isReadOnly();
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
}
