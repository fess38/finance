import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ClarityModule } from '@clr/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../../app-routing.module';
import { AlertModule } from '../../utils/alert/alert.module';
import { CurrencyNamePipe } from '../../utils/currency-name.pipe';
import { CurrencySymbolPipe } from '../../utils/currency-symbol.pipe';
import { IsNewEntityPipe } from '../../utils/is-new-entity.pipe';
import { IsReadOnlyPipe } from '../../utils/is-read-only.pipe';
import { LocalePipe } from '../../utils/locale.pipe';
import { MoneyDecoderPipe } from '../../utils/money-decoder.pipe';
import { MoneyEncoderPipe } from '../../utils/money-encoder.pipe';

@NgModule({
  imports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule, TranslateModule
  ],
  exports: [
    AlertModule, AppRoutingModule, BrowserModule, ClarityModule, FormsModule, MoneyDecoderPipe,
    MoneyEncoderPipe, TranslateModule,
    CurrencyNamePipe, CurrencySymbolPipe, IsNewEntityPipe, IsReadOnlyPipe, LocalePipe,
    MoneyDecoderPipe, MoneyEncoderPipe
  ],
  declarations: [
    CurrencyNamePipe, CurrencySymbolPipe, IsNewEntityPipe, IsReadOnlyPipe, LocalePipe,
    MoneyDecoderPipe, MoneyEncoderPipe
  ]
})
export class SharedModule {}
