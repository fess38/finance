import { Component, OnInit } from '@angular/core';
import { AppMode, FamilyMember } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'family-member-list.component.html'
})
export class FamilyMemberListComponent implements OnInit {
  constructor(private userdata: UserDataService) {}

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
  }

  familyMembers(): FamilyMember[] {
    return this.userdata.familyMembers().sort((a, b) => a.name < b.name ? -1 : 1);
  }
}
