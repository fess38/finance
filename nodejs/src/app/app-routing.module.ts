import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { MainPageComponent } from './core/main-page/main-page.component';
import { SettingsComponent } from './core/settings/settings.component';
import { FamilyMemberDetailComponent } from './family-member/family-member-detail/family-member-detail.component';
import { FamilyMemberListComponent } from './family-member/family-member-list/family-member-list.component';
import { SubCategoryDetailComponent } from './sub-category/sub-category-detail/sub-category-detail.component';
import { SubCategoryListComponent } from './sub-category/sub-category-list/sub-category-list.component';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'account',
    component: AccountListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'account/:id',
    component: AccountDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category',
    component: CategoryListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sub_category',
    component: SubCategoryListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'sub_category/:id',
    component: SubCategoryDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'family_member',
    component: FamilyMemberListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'family_member/:id',
    component: FamilyMemberDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: []
})
export class AppRoutingModule {}
