import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { NgModule } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared/shared.module';
import { FamilyMemberModule } from './family-member/family-member.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { TransactionModule } from './transaction/transaction.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeEn, 'en');

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately'
  }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AccountModule, CategoryModule, CoreModule, FamilyMemberModule,
    SharedModule, SubCategoryModule, TransactionModule
  ],
  providers: [
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
