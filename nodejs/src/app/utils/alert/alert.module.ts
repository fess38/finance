import { NgModule } from '@angular/core';
import { ClarityModule } from '@clr/angular';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';

@NgModule({
  declarations: [
    AlertComponent
  ],
  imports: [
    ClarityModule
  ],
  providers: [
    AlertService
  ],
  exports: [ AlertComponent ]
})
export class AlertModule {}
