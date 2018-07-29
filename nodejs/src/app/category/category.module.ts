import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AlertModule } from '../alert/alert.module';
import { AppRoutingModule } from '../app-routing.module';
import { UserDataService } from '../utils/user-data.service';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListComponent } from './category-list/category-list.component';

@NgModule({
  declarations: [
    CategoryListComponent, CategoryDetailComponent
  ],
  imports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule
  ],
  providers: [
    UserDataService
  ]
})
export class CategoryModule {}
