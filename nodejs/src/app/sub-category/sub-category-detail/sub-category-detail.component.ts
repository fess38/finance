import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubCategory } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'sub-category-detail.component.html'
})
export class SubCategoryDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  subCategory = new SubCategory();

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

  isReadOnly(): boolean {
    return this.userdata.isReadOnly();
  }

  categories() {
    return this.userdata.categories()
      .filter(x => x.isVisible)
      .sort((a, b) => {
        if (a.isIncome != b.isIncome) {
          return a.isIncome < b.isIncome ? 1 : -1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
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
    this.router.navigate(['/transaction'], {
      queryParams: {
        sub_category_id: subCategory.id,
        transaction_amount: subCategory.transactionAmount,
        source: 'sub_category'
      }
    });
  }
}
