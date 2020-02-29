import { Component } from '@angular/core';
import * as _ from 'underscore';
import { Category, SubCategory } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'sub-category-list.component.html'
})
export class SubCategoryListComponent {
  constructor(private userdata: UserDataService) {}

  filterCategoryId: number;

  categories(): Category[] {
    return _.chain(this.userdata.categories())
      .sortBy(x => x.isIncome)
      .sortBy(x => x.name.toLowerCase())
      .value();
  }

  subCategories(): SubCategory[] {
    let result = _.chain(this.userdata.subCategories())
      .sortBy(x => x.name.toLowerCase())
      .sortBy(x => this.userdata.findCategory(x.categoryId).name)
      .sortBy(x => !this.userdata.findCategory(x.categoryId).isIncome)
      .value();
    if (this.filterCategoryId != null) {
      result = result.filter(x => x.categoryId == this.filterCategoryId);
    }
    return result;
  }

  findCategory(categoryId: number): Category {
    return this.userdata.findCategory(categoryId);
  }
}
