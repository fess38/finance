import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ClarityModule } from '@clr/angular';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { CoreModule } from './core/core.module';
import { FamilyMemberModule } from './family-member/family-member.module';
import { SubCategoryModule } from './sub-category/sub-category.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ClarityModule, ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    AccountModule, CategoryModule, CoreModule,
    FamilyMemberModule, SubCategoryModule
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
