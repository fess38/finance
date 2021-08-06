import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AccessLinkComponent } from './auth/access-link/access-link.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { ErrorPageComponent } from './core/error-page/error-page.component';
import { MainPageComponent } from './core/main-page/main-page.component';
import { SettingsComponent } from './core/settings/settings.component';
import { FamilyMemberDetailComponent } from './family-member/family-member-detail/family-member-detail.component';
import { FamilyMemberListComponent } from './family-member/family-member-list/family-member-list.component';
import { SecurityTransactionDetailComponent } from './security-transaction/security-transaction-detail/security-transaction-detail.component';
import { SecurityTransactionListComponent } from './security-transaction/security-transaction-list/security-transaction-list.component';
import { SecurityDetailComponent } from './security/security-detail/security-detail.component';
import { SecurityListComponent } from './security/security-list/security-list.component';
import { SubCategoryDetailComponent } from './sub-category/sub-category-detail/sub-category-detail.component';
import { SubCategoryListComponent } from './sub-category/sub-category-list/sub-category-list.component';
import { TransactionDateComponent } from './transaction/transaction-date/transaction-date.component';
import { TransactionDetailComponent } from './transaction/transaction-detail/transaction-detail.component';
import { TransactionFutureListComponent } from './transaction/transaction-future-list/transaction-future-list.component';
import { TransactionListComponent } from './transaction/transaction-list/transaction-list.component';
import { TransactionMonthComponent } from './transaction/transaction-month/transaction-month.component';
import { TransactionTemplateDetailComponent } from './transaction/transaction-template-detail/transaction-template-detail.component';
import { TransactionTemplateListComponent } from './transaction/transaction-template-list/transaction-template-list.component';
import { TransactionYearComponent } from './transaction/transaction-year/transaction-year.component';

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
    path: 'error',
    component: ErrorPageComponent,
  },
  {
    path: 'access_link/:token',
    component: AccessLinkComponent
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuardService]
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
    path: 'transaction',
    component: TransactionListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction/:id',
    component: TransactionDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction_future',
    component: TransactionFutureListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction_template',
    component: TransactionTemplateListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'transaction_template/:id',
    component: TransactionTemplateDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'security',
    component: SecurityListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'security/:id',
    component: SecurityDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'security_transaction',
    component: SecurityTransactionListComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'security_transaction/:id',
    component: SecurityTransactionDetailComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'report/date',
    component: TransactionDateComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'report/month',
    component: TransactionMonthComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'report/year',
    component: TransactionYearComponent,
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
