import { Component } from '@angular/core';
import * as _ from 'underscore';
import { Category } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';

@Component({
  templateUrl: 'category-list.component.html'
})
export class CategoryListComponent {
  constructor(private userdata: UserDataService) {}

  categories(): Category[] {
    return _
      .chain(this.userdata.categories)
      .filter(x => !x.isDeleted)
      .filter(x => x.isIncome || x.isExpense)
      .sortBy(x => x.name.toLowerCase())
      .sortBy(x => !x.isIncome)
      .value();
  }
}
