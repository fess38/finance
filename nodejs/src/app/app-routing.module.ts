import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';
import { FamilyMemberDetailComponent } from './family-member/family-member-detail/family-member-detail.component';
import { FamilyMemberListComponent } from './family-member/family-member-list/family-member-list.component';
import { MainPageComponent } from './main-page/main-page.component';

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
  providers: [
  ]
})
export class AppRoutingModule {}
