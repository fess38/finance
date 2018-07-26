import { Component } from '@angular/core';
import * as _ from 'underscore';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'category-list.component.html'
})
export class CategoryListComponent {
  constructor(private userdata: UserDataService) {}

  categories() {
    return _
      .chain(this.userdata.categories)
      .filter(x => !x.isDeleted)
      .filter(x => x.isIncome || x.isExpense)
      .sortBy(x => x.name.toLowerCase())
      .sortBy(x => !x.isIncome)
      .value();
  }
}
