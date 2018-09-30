import { Component } from '@angular/core';
import * as _ from 'underscore';
import { Category } from '../../core/model/model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'sub-category-list.component.html'
})
export class SubCategoryListComponent {
  constructor(private userdata: UserDataService) {}

  subCategories() {
    return _
      .chain(this.userdata.subCategories)
      .filter(x => !x.isDeleted)
      .sortBy(x => x.name.toLowerCase())
      .sortBy(x => this.findCategory(<number>x.categoryId).name)
      .sortBy(x => !this.findCategory(<number>x.categoryId).isIncome)
      .value();
  }

  findCategory(categoryId: number): Category {
    return this.userdata.categories.filter(x => x.id == categoryId)[0];
  }
}
