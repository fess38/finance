import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppMode, Category } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AlertService } from '../../utils/alert/alert.service';

@Component({
  templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  category = new Category();

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedCategory = this.userdata.findCategory(+id);
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

  update(category: Category): void {
    if (category.id == 0) {
      this.userdata.saveCategory(category)
        .then(() => this.router.navigate(['/category/' + category.id]))
        .catch(error => {
          console.error(error.message);
          this.alertService.error('error.save');
        });
    } else {
      this.userdata.updateCategory(category)
        .then(() => this.router.navigate(['/category']))
        .catch(error => {
          console.error(error.message);
          this.alertService.error(category.isDeleted ? 'error.delete' : 'error.update');
          category.isDeleted = false;
        });
    }
  }

  delete(category: Category): void {
    category.isDeleted = true;
    this.update(category);
  }

  hasLinkedEntities(): boolean {
    const subCategoryAmount = this.userdata.subCategories()
      .filter(x => x.categoryId == this.category.id)
      .length;
    return this.category.transactionAmount > 0 || subCategoryAmount > 0;
  }

  isValidForm(): boolean {
    return !(this.category.isIncome == this.category.isExpense)
      && this.category.name.length > 0;
  }

  viewTransactions(category: Category): void {
    this.router.navigate(['/transaction'], {
      queryParams: {
        category_id: category.id,
        source: `category/${category.id}`
      }
    });
  }
}
