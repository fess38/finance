import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { ErrorPageComponent } from './error-page/error-page.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from './shared/shared.module';
import { UserDataService } from './user-data.service';

@NgModule({
  declarations: [
    MainMenuComponent, MainPageComponent, SettingsComponent, ErrorPageComponent
  ],
  imports: [
    SharedModule, AuthModule
  ],
  providers: [
    UserDataService
  ],
  exports: [
    MainMenuComponent
  ]
})
export class CoreModule {}
