import { NgModule } from '@angular/core';
import { AuthModule } from '../auth/auth.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsComponent } from './settings/settings.component';
import { SharedModule } from './shared/shared.module';
import { UserDataService } from './user-data.service';

@NgModule({
  declarations: [
    MainMenuComponent, MainPageComponent, SettingsComponent
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
