import { Component } from '@angular/core';
import { FamilyMember } from '../../model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'family-member-list.component.html'
})
export class FamilyMemberListComponent {
  constructor(private userdata: UserDataService) {}

  familyMembers() {
    return this.userdata.familyMembers
      .filter(x => !x.isDeleted)
      .sort(FamilyMemberListComponent.sortByName());
  }

  private static sortByName() {
    return (a: FamilyMember, b: FamilyMember) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    };
  }
}
