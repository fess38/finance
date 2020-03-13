import { Component } from '@angular/core';
import { Category } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'category-list.component.html'
})
export class CategoryListComponent {
  constructor(private userdata: UserDataService) {}

  categories(): Category[] {
    return this.userdata.categories()
      .filter(x => x.isIncome || x.isExpense)
      .sort((a, b) => {
        if (a.isIncome != b.isIncome) {
          return a.isIncome < b.isIncome ? 1 : -1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
  }
}
