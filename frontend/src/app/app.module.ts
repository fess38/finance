import { registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeRu from '@angular/common/locales/ru';
import { NgModule, SecurityContext } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  ClarityIcons, cogIcon, fastForwardIcon, infoCircleIcon, pencilIcon, plusCircleIcon, rewindIcon, undoIcon
} from '@cds/core/icon';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';
import { environment } from '../environments/environment';
import { AccountModule } from './account/account.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './core/shared/shared.module';
import { FamilyMemberModule } from './family-member/family-member.module';
import { NotepadModule } from './notepad/notepad.module';
import { SecurityModule } from './security/security.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { TransactionModule } from './transaction/transaction.module';

ClarityIcons.addIcons(cogIcon, fastForwardIcon, infoCircleIcon, pencilIcon, plusCircleIcon, rewindIcon, undoIcon);

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

registerLocaleData(localeRu, 'ru');
registerLocaleData(localeEn, 'en');

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  const listRenderer = renderer.list;
  renderer.list = (body: string, ordered: boolean, start: number) => {
    return listRenderer.call(renderer, body, ordered, start)
      .replace('<ol>', '<ol class="list">')
      .replace('<ul>', '<ul class="list">');
  };

  const tableRenderer = renderer.table;
  renderer.table = (header: string, body: string) => {
    return tableRenderer.call(renderer, header, body)
      .replace('<table>', '<table class="table table-compact">');
  };

  const linkRenderer = renderer.link;
  renderer.link = (href: string, title: string, text: string) => {
    return linkRenderer.call(renderer, href, title, text)
      .replace(/^<a /, '<a target="_blank" rel="nofollow" ');
  };

  return {
    renderer: renderer,
    gfm: true,
    breaks: false,
    pedantic: false,
    smartLists: true,
    smartypants: false
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MarkdownModule.forRoot({
      markedOptions: {
        provide: MarkedOptions,
        useFactory: markedOptionsFactory
      },
      sanitize: SecurityContext.NONE
    }),
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
    AccountModule, CategoryModule, CoreModule, FamilyMemberModule, NotepadModule,
    SecurityModule, SharedModule, SubCategoryModule, TransactionModule
  ],
  providers: [
    Title
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
