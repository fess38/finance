import { Component } from '@angular/core';
import { Security } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'security-list.component.html'
})
export class SecurityListComponent {
  constructor(private userdata: UserDataService) {}

  securities(): Security[] {
    return this.userdata.securities().sort((a, b) => a.name < b.name ? -1 : 1);
  }
}
