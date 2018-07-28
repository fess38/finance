import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'underscore';
import { AlertService } from '../../alert/alert.service';
import { SubCategory } from '../../model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'sub-category-detail.component.html'
})
export class SubCategoryDetailComponent {
  subCategory: SubCategory = new SubCategory();

  constructor(private userdata: UserDataService,
              private alertService: AlertService,
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
        this.alertService.error('Ошибка обновления');
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

  hasCategory() {
    return this.subCategory.categoryId != 0;
  }

  hasTransations() {
    return this.subCategory.transactionAmount > 0;
  }
}
