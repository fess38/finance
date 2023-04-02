import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppMode, FamilyMember } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AlertService } from '../../utils/alert/alert.service';

@Component({
  templateUrl: 'family-member-detail.component.html'
})
export class FamilyMemberDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  familyMember = new FamilyMember();

  ngOnInit() {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedFamilyMember = this.userdata.findFamilyMember(+id);
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
        .then(() => this.router.navigate(['/family_member/' + familyMember.id]))
        .catch(error => {
          console.error(error.message);
          this.alertService.error('error.save');
        });
    } else {
      this.userdata.updateFamilyMember(familyMember)
        .then(() => this.router.navigate(['/family_member']))
        .catch(error => {
          console.error(error.message);
          this.alertService.error(familyMember.isDeleted ? 'error.delete' : 'error.update');
          familyMember.isDeleted = false;
        });
    }
  }

  delete(familyMember: FamilyMember) {
    familyMember.isDeleted = true;
    this.update(familyMember);
  }

  hasTransations() {
    return this.familyMember.transactionAmount > 0;
  }

  isValidForm() {
    return this.familyMember.name.length > 0;
  }

  viewTransactions(familyMember: FamilyMember) {
    this.router.navigate(['/transaction'], {
      queryParams: {
        family_member_id: familyMember.id,
        source: `family_member/${familyMember.id}`
      }
    });
  }
}
