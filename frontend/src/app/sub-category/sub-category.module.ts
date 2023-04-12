import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { SubCategoryDetailComponent } from './sub-category-detail/sub-category-detail.component';
import { SubCategoryListComponent } from './sub-category-list/sub-category-list.component';

@NgModule({
  declarations: [
    SubCategoryListComponent, SubCategoryDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class SubCategoryModule {}
