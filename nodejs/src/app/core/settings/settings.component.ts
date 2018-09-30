import { Component } from '@angular/core';
import { UserDataService } from '../../utils/user-data.service';
import { Settings } from '../model/model';
import Language = Settings.Language;

@Component({
  templateUrl: 'settings.component.html'
})
export class SettingsComponent {
  constructor(private userdata: UserDataService) {}

  languages(): any[] {
    return [{ code: Language.RU, value: 'RU' }, { code: Language.EN, value: 'EN' }];
  }

  updateSettings() {
    this.userdata.updateSettings(this.userdata.settings)
      .catch(error => {
        console.error(error.message);
      });
  }
}
