import { Pipe, PipeTransform } from '@angular/core';
import { Currency, Settings } from '../core/model/model';
import { UserDataService } from '../core/user-data/user-data.service';
import Language = Settings.Language;

@Pipe({
  name: 'currencyName',
  pure: false
})
export class CurrencyNamePipe implements PipeTransform {
  constructor(private userdata: UserDataService) {}

  transform(currency: Currency): unknown {
    return this.userdata.settings().language == Language.RU ? currency.nameRu : currency.nameEn;
  }
}
