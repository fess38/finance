import { Component, OnInit } from '@angular/core';
import { AppMode, Category } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  constructor(private userdata: UserDataService) {}

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
  }

  categories(): Category[] {
    return this.userdata.categories()
      .filter(x => x.isIncome || x.isExpense)
      .sort((a, b) => {
        if (a.isIncome != b.isIncome) {
          return a.isIncome < b.isIncome ? 1 : -1;
        } else {
          return a.name < b.name ? -1 : 1;
        }
      });
  }
}
