import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from '../app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MainPageComponent } from './main-page/main-page.component';
import { SettingsComponent } from './settings/settings.component';
import { UserDataService } from './user-data.service';

@NgModule({
  declarations: [
    MainMenuComponent, MainPageComponent, SettingsComponent
  ],
  imports: [
    BrowserModule, ClarityModule, FormsModule,
    AppRoutingModule, AuthModule
  ],
  providers: [
    UserDataService
  ],
  exports: [
    MainMenuComponent
  ]

})
export class CoreModule {}
