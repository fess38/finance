import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Settings } from '../model/model';
import { UserDataService } from '../user-data.service';
import Language = Settings.Language;

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent {
  languages: any[] = [{ code: Language.RU, value: 'RU' }, { code: Language.EN, value: 'EN' }];

  constructor(public userdata: UserDataService, private router: Router) {}

  updateSettings() {
    this.userdata.updateSettings(this.userdata.settings)
      .catch(error => {
        console.error(error.message);
        this.router.navigate(['/error']);
      });
  }
}
