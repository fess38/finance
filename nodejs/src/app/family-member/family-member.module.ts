import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data.service';
import { FamilyMemberDetailComponent } from './family-member-detail/family-member-detail.component';
import { FamilyMemberListComponent } from './family-member-list/family-member-list.component';

@NgModule({
  declarations: [
    FamilyMemberListComponent, FamilyMemberDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class FamilyMemberModule {}
