import { Component } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { FamilyMember } from '../model';
import { UserDataService } from '../utils/user-data.service';

@Component({
  templateUrl: 'family-member.component.html'
})
export class FamilyMemberComponent {
  constructor(private userdata: UserDataService,
              private alertService: AlertService) {}

  isEditing: boolean = false;
  newFamilyMember = new FamilyMember();

  familyMembers() {
    return this.userdata.familyMembers
      .filter(x => !x.isDeleted)
      .sort((a: FamilyMember, b: FamilyMember) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
  }

  save(familyMember: FamilyMember) {
    this.userdata.saveFamilyMember(familyMember)
      .then(() => this.stopEdit())
      .catch(error => {
        this.alertService.error('Ошибка сохранения');
        console.error(error.message);
      });
  }

  update(familyMember: FamilyMember) {
    if (familyMember.id != 0) {
      this.userdata.updateFamilyMember(familyMember)
        .then(() => this.stopEdit())
        .catch(error => {
          this.alertService.error('Ошибка обновления');
          console.error(error.message);
        });
    }
  }

  delete(familyMember: FamilyMember) {
    familyMember.isDeleted = true;
    this.userdata.updateFamilyMember(familyMember)
      .then(() => this.stopEdit())
      .catch(error => {
        this.alertService.error('Ошибка удаления');
        console.error(error.message);
      });
  }

  startEdit(familyMember: FamilyMember) {
    this.newFamilyMember = familyMember;
    this.isEditing = true;
  }

  stopEdit() {
    this.newFamilyMember = new FamilyMember();
    this.isEditing = false;
  }

  isFamilyMemberAdding(): boolean {
    return !this.newFamilyMember['id'];
  }

  hasTransactions(familyMember: FamilyMember): boolean {
    return false;
  }
}

