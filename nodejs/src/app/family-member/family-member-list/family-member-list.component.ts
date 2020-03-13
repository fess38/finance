import { Component } from '@angular/core';
import { FamilyMember } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'family-member-list.component.html'
})
export class FamilyMemberListComponent {
  constructor(private userdata: UserDataService) {}

  familyMembers(): FamilyMember[] {
    return this.userdata.familyMembers().sort((a, b) => a.name < b.name ? -1 : 1);
  }
}
