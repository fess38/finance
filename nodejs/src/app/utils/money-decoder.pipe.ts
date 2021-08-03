import { Pipe, PipeTransform } from '@angular/core';
import { Money } from '../core/model/model';

@Pipe({
  name: 'moneyDecoder'
})
export class MoneyDecoderPipe implements PipeTransform {
  transform(value: string): Money {
    if (!value) {
      return new Money({ units: 0 });
    }
    if (value.indexOf('.') != -1) {
      const units = Number(value.split('.')[0]);
      let micros = value.split('.')[1];
      for (let i = micros.length; i < 6; ++i) {
        micros += '0';
      }
      return new Money({ units: units, micros: Number(micros) });
    } else {
      return new Money({ units: Number(value) });
    }
  }
}
