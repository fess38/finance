import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from '../app-routing.module';
import { UserDataService } from '../core/user-data.service';
import { FamilyMemberDetailComponent } from './family-member-detail/family-member-detail.component';
import { FamilyMemberListComponent } from './family-member-list/family-member-list.component';

@NgModule({
  declarations: [
    FamilyMemberListComponent, FamilyMemberDetailComponent
  ],
  imports: [
    AppRoutingModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    UserDataService
  ]
})
export class FamilyMemberModule {}
