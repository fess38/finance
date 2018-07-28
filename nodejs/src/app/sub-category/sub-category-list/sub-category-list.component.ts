import { Component } from '@angular/core';
import * as _ from 'underscore';
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
      .value();
  }
}
