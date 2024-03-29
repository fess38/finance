import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../../app-routing.module';
import { ActionButtonsModule } from '../../utils/action-buttons/action-buttons.module';
import { AlertModule } from '../../utils/alert/alert.module';
import { CurrencyNamePipe } from '../../utils/currency-name.pipe';
import { CurrencySymbolPipe } from '../../utils/currency-symbol.pipe';
import { DateParserPipe } from '../../utils/date-parser.pipe';
import { IsNewEntityPipe } from '../../utils/is-new-entity.pipe';
import { IsReadOnlyPipe } from '../../utils/is-read-only.pipe';
import { LocalePipe } from '../../utils/locale.pipe';
import { MoneyEncoderPipe } from '../../utils/money-encoder.pipe';

@NgModule({
  imports: [
    ActionButtonsModule, AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule, TranslateModule
  ],
  exports: [
    ActionButtonsModule, AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule,
    MoneyEncoderPipe, TranslateModule,
    CurrencyNamePipe, CurrencySymbolPipe, DateParserPipe, IsNewEntityPipe, IsReadOnlyPipe,
    LocalePipe, MoneyEncoderPipe
  ],
  declarations: [
    CurrencyNamePipe, CurrencySymbolPipe, DateParserPipe, IsNewEntityPipe, IsReadOnlyPipe,
    LocalePipe, MoneyEncoderPipe
  ]
})
export class SharedModule {}
