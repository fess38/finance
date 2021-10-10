import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { NotepadModule } from '../notepad/notepad.module';
import { TransactionCriteriaService } from '../transaction/transaction-criteria.service';
import { BlankPageComponent } from './blank-page/blank-page.component';
import { FinanceSidenavComponent } from './finance-sidenav/finance-sidenav.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from './shared/shared.module';
import { UserDataService } from './user-data/user-data.service';

@NgModule({
  declarations: [
    BlankPageComponent, MainPageComponent, SettingsComponent, FinanceSidenavComponent
  ],
  imports: [
    AuthModule, NotepadModule, SharedModule
  ],
  providers: [
    TransactionCriteriaService, UserDataService
  ],
  exports: [
    MainPageComponent
  ]
})
export class CoreModule {}
