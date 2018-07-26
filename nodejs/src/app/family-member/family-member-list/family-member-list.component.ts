import { Component } from '@angular/core';
import * as _ from 'underscore';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'family-member-list.component.html'
})
export class FamilyMemberListComponent {
  constructor(private userdata: UserDataService) {}

  familyMembers() {
    return _.chain(this.userdata.familyMembers)
      .filter(x => !x.isDeleted)
      .sortBy(x => x.name)
      .value();
  }
}
