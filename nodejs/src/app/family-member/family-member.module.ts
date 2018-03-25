import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AlertModule } from '../alert/alert.module';
import { HttpService } from '../utils/http.service';
import { UserDataService } from '../utils/user-data.service';
import { FamilyMemberComponent } from './family-member.component';

@NgModule({
  declarations: [
    FamilyMemberComponent
  ],
  imports: [
    AlertModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    HttpService, UserDataService
  ]
})
export class FamilyMemberModule {}
