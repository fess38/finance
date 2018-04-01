import { NgModule } from '@angular/core';
import { AlertComponent } from './alert.component';
import { AlertService } from './alert.service';
import { ClarityModule } from 'clarity-angular';

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
