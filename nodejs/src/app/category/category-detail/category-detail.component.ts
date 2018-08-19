import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../alert/alert.service';
import { Category } from '../../model';
import { UserDataService } from '../../utils/user-data.service';

@Component({
  templateUrl: 'category-detail.component.html'
})
export class CategoryDetailComponent {
  category: Category = new Category();

  constructor(private userdata: UserDataService,
              private alertService: AlertService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const navigatedCategory = this.userdata.categories.filter(x => x.id == +id)[0];
      if (navigatedCategory == null) {
        this.router.navigate(['/category /new']);
      } else {
        this.category = navigatedCategory;
      }
    }
  }

  update(category: Category) {
    let promise: Promise<any>;
    if (category.id == 0) {
      promise = this.userdata.saveCategory(category);
    } else {
      promise = this.userdata.updateCategory(category);
    }
    promise
      .then(() => this.router.navigate(['/category']))
      .catch(error => {
        this.alertService.error('Ошибка обновления');
        console.error(error.message);
      });
  }

  delete(category: Category) {
    category.isDeleted = true;
    this.update(category);
    this.router.navigate(['/category']);
  }

  isNewCategory() {
    return this.category.id == 0;
  }

  hasTransations() {
    return this.category.transactionAmount > 0;
  }

  isValidForm() {
    return !(this.category.isIncome == this.category.isExpense)
      && this.category.name.length > 0;
  }

}
