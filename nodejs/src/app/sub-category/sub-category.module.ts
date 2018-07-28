import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from 'clarity-angular';
import { AlertModule } from '../alert/alert.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserDataService } from '../utils/user-data.service';
import { SubCategoryDetailComponent } from './sub-category-detail/sub-category-detail.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';

@NgModule({
  declarations: [
    SubCategoryListComponent, SubCategoryDetailComponent
  ],
  imports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    UserDataService
  ]
})
export class SubCategoryModule {}
