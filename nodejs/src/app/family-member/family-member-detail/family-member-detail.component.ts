import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FamilyMember } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'family-member-detail.component.html'
})
export class FamilyMemberDetailComponent implements OnInit, OnDestroy {
  familyMember: FamilyMember = new FamilyMember();
  private subscription: Subscription;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedFamilyMember = this.userdata.familyMembers().filter(x => x.id == +id)[0];
        if (navigatedFamilyMember == null) {
          this.router.navigate(['/family_member']);
        } else {
          this.familyMember = navigatedFamilyMember;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update(familyMember: FamilyMember) {
    if (familyMember.id == 0) {
      this.userdata.saveFamilyMember(familyMember)
        .then(newFamilyMember => {
          this.router.navigate(['/family_member/' + newFamilyMember.id]);
          this.familyMember = newFamilyMember;
        })
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateFamilyMember(familyMember)
        .then(() => this.router.navigate(['/family_member']))
        .catch(error => {
          familyMember.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(familyMember: FamilyMember) {
    familyMember.isDeleted = true;
    this.update(familyMember);
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

  viewTransactions(familyMember: FamilyMember) {
    this.router.navigate(['/transaction'], { queryParams: { family_member_id: familyMember.id } });
  }
}
