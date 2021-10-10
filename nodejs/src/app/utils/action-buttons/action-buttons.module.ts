import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ActionButtonsComponent } from './action-buttons.component';

@NgModule({
  declarations: [
    ActionButtonsComponent
  ],
  imports: [
    ClarityModule, TranslateModule
  ],
  exports: [
    ActionButtonsComponent
  ]
})
export class ActionButtonsModule {}
