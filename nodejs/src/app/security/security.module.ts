import { NgModule } from '@angular/core';
import { SharedModule } from '../core/shared/shared.module';
import { UserDataService } from '../core/user-data/user-data.service';
import { SecurityDetailComponent } from './security-detail/security-detail.component';
import { SecurityListComponent } from './security-list/security-list.component';

@NgModule({
  declarations: [
    SecurityListComponent,
    SecurityDetailComponent
  ],
  imports: [
    SharedModule
  ],
  providers: [
    UserDataService
  ]
})
export class SecurityModule {}
