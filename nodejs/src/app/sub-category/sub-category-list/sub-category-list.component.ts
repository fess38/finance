import { Component } from '@angular/core';
import { Category, SubCategory } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'sub-category-list.component.html'
})
export class SubCategoryListComponent {
  constructor(private userdata: UserDataService) {}

  filterCategoryId: number;

  categories(): Category[] {
    return this.userdata.categories()
      .sort((a, b) => {
        if (a.isIncome != b.isIncome) {
          return a.isIncome < b.isIncome ? 1 : -1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
  }

  subCategories(): SubCategory[] {
    let result = this.userdata.subCategories()
      .sort((x, y) => {
        const a: Category = this.userdata.findCategory(x.categoryId);
        const b: Category = this.userdata.findCategory(y.categoryId);
        if (a.isIncome != b.isIncome) {
          return a.isIncome < b.isIncome ? 1 : -1;
        } else if (a.name != b.name) {
          return a.name < b.name ? -1 : 1;
        } else {
          return x.name < y.name ? -1 : 1;
        }
      });
    if (this.filterCategoryId != null) {
      result = result.filter(x => x.categoryId == this.filterCategoryId);
    }
    return result;
  }

  findCategory(categoryId: number): Category {
    return this.userdata.findCategory(categoryId);
  }
}
