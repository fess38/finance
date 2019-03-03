import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import { SubCategory } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';

@Component({
  templateUrl: 'sub-category-detail.component.html'
})
export class SubCategoryDetailComponent implements OnInit, OnDestroy {
  subCategory: SubCategory = new SubCategory();
  private subscription: Subscription;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedSubCategory = this.userdata.subCategories().filter(x => x.id == +id)[0];
        if (navigatedSubCategory == null) {
          this.router.navigate(['/sub_category']);
        } else {
          this.subCategory = navigatedSubCategory;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  categories() {
    return _.chain(this.userdata.categories())
      .filter(x => !x.isDeleted)
      .filter(x => x.isVisible)
      .sortBy(x => x.name.toLowerCase())
      .sortBy(x => !x.isIncome)
      .value();
  }

  update(subCategory: SubCategory) {
    if (subCategory.id == 0) {
      this.userdata.saveSubCategory(subCategory)
        .then(newSubCategory => {
          this.router.navigate(['/sub_category/' + newSubCategory.id]);
          this.subCategory = newSubCategory;
        })
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateSubCategory(subCategory)
        .then(() => this.router.navigate(['/sub_category']))
        .catch(error => {
          subCategory.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(subCategory: SubCategory) {
    subCategory.isDeleted = true;
    this.update(subCategory);
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

  viewTransactions(subCategory: SubCategory) {
    this.router.navigate(['/transaction'], { queryParams: { sub_category_id: subCategory.id } });
  }
}
