import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AlertModule } from '../alert/alert.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserDataService } from '../utils/user-data.service';
import { FamilyMemberDetailComponent } from './family-member-detail/family-member-detail.component';
import { FamilyMemberListComponent } from './family-member-list/family-member-list.component';

@NgModule({
  declarations: [
    FamilyMemberListComponent,
    FamilyMemberDetailComponent
  ],
  imports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    UserDataService
  ]
})
export class FamilyMemberModule {}
