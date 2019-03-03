import { Component } from '@angular/core';
import * as _ from 'underscore';
import { FamilyMember } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';

@Component({
  templateUrl: 'family-member-list.component.html'
})
export class FamilyMemberListComponent {
  constructor(private userdata: UserDataService) {}

  familyMembers(): FamilyMember[] {
    return _.chain(this.userdata.familyMembers())
      .filter(x => !x.isDeleted)
      .sortBy(x => x.name.toLowerCase())
      .value();
  }
}
