import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import { SubCategory } from '../../core/model/model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'sub-category-detail.component.html'
})
export class SubCategoryDetailComponent {
  subCategory: SubCategory = new SubCategory();

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const navigatedSubCategory = this.userdata.subCategories.filter(x => x.id == +id)[0];
      if (navigatedSubCategory == null) {
        this.router.navigate(['/sub_category/new']);
      } else {
        this.subCategory = navigatedSubCategory;
      }
    }
  }

  categories() {
    return _.chain(this.userdata.categories)
      .filter(x => !x.isDeleted)
      .filter(x => x.isVisible)
      .sortBy(x => x.name.toLowerCase())
      .sortBy(x => !x.isIncome)
      .value();
  }

  update(subCategory: SubCategory) {
    let promise: Promise<any>;
    if (subCategory.id == 0) {
      promise = this.userdata.saveSubCategory(subCategory);
    } else {
      promise = this.userdata.updateSubCategory(subCategory);
    }
    promise
      .then(() => this.router.navigate(['/sub_category']))
      .catch(error => {
        console.error(error.message);
      });
  }

  delete(subCategory: SubCategory) {
    subCategory.isDeleted = true;
    this.update(subCategory);
    this.router.navigate(['/subcategory']);
  }

  isNewSubCategory() {
    return this.subCategory.id == 0;
  }

  hasTransations() {
    return this.subCategory.transactionAmount > 0;
  }

  isValidForm() {
    return this.subCategory.name.length > 0 && this.subCategory.categoryId != 0;
  }
}
