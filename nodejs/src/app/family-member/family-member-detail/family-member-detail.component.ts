import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { FamilyMember } from '../../model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'family-member-detail.component.html'
})
export class FamilyMemberDetailComponent implements OnInit {
  familyMember: FamilyMember = new FamilyMember();

  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const navigatedFamilyMember = this.userdata.familyMembers.filter(x => x.id == +id)[0];
      if (navigatedFamilyMember == null) {
        this.router.navigate(['/family_member/new']);
      } else {
        this.familyMember = navigatedFamilyMember;
      }
    }
  }

  update(familyMember: FamilyMember) {
    let promise: Promise<any>;
    if (familyMember.id == 0) {
      promise = this.userdata.saveFamilyMember(familyMember);
    } else {
      promise = this.userdata.updateFamilyMember(familyMember);
    }
    promise
      .then(() => this.router.navigate(['/family_member']))
      .catch(error => {
        this.alertService.error('Ошибка обновления');
        console.error(error.message);
      });
  }

  delete(familyMember: FamilyMember) {
    familyMember.isDeleted = true;
    this.update(familyMember);
    this.router.navigate(['/family_member']);
  }

  isNewFamilyMember() {
    return this.familyMember.id == 0;
  }

  hasTransations() {
    return this.familyMember.transactionAmount > 0;
  }

  isValidForm() {
    return this.familyMember.name.length > 0;
  }
}
