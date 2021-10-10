import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from '../../utils/alert/alert.service';
import { Currency, DataStorage, Settings } from '../model/model';
import { UserDataService } from '../user-data/user-data.service';
import Language = Settings.Language;

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private router: Router,
              private sanitizer: DomSanitizer) {}

  private subscription: Subscription;
  settings = new Settings();
  languages: any[] = [{ code: Language.RU, value: 'RU' }, { code: Language.EN, value: 'EN' }];
  exportDataUrl: SafeUrl;
  isDataImport = false;

  ngOnInit(): void {
    this.subscription = this.userdata.subscribeOnInit(() => {
      this.settings = this.userdata.settings();
      const blob = new Blob([JSON.stringify(this.userdata.dataStorageJson())], { type: 'application/json' });
      this.exportDataUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  currencies(): Currency[] {
    return this.userdata.currencies();
  }

  updateSettings() {
    this.userdata.updateSettings(this.settings).catch(error => {
      this.alertService.error('error.update');
      console.error(error.message);
    });
  }

  importData(file: File) {
    file.text()
      .then(data => {
        this.isDataImport = true;
        this.userdata.saveDataStorage(DataStorage.fromObject(JSON.parse(data))).then(() => this.isDataImport = false);
      })
      .catch(error => {
        this.alertService.error('error.update');
        this.isDataImport = false;
        console.error(error.message);
      });
  }

  deleteData() {
    this.userdata.deleteDataStorage().catch(error => {
      this.alertService.error('error.delete');
      console.error(error.message);
    });
  }
}
