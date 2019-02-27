import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';

@Component({
  templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  category: Category = new Category();
  private subscription: Subscription;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedCategory = this.userdata.categories.filter(x => x.id == +id)[0];
        if (navigatedCategory == null) {
          this.router.navigate(['/category']);
        } else {
          this.category = navigatedCategory;
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

  update(category: Category) {
    if (category.id == 0) {
      this.userdata.saveCategory(category)
        .then(newCategory => {
          this.router.navigate(['/category/' + newCategory.id]);
          this.category = newCategory;
        })
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateCategory(category)
        .then(() => this.router.navigate(['/category']))
        .catch(error => {
          category.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(category: Category) {
    category.isDeleted = true;
    this.update(category);
  }

  isNewCategory() {
    return this.category.id == 0;
  }

  hasLinkedEntities() {
    const subCategoryAmount = this.userdata.subCategories
      .filter(x => !x.isDeleted && x.categoryId == this.category.id)
      .length;
    return this.category.transactionAmount > 0 || subCategoryAmount > 0;
  }

  isValidForm() {
    return !(this.category.isIncome == this.category.isExpense)
      && this.category.name.length > 0;
  }
}
