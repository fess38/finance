import { Pipe, PipeTransform } from '@angular/core';
import { Money } from '../core/model/model';

@Pipe({
  name: 'decodeMoney'
})
export class MoneyDecoderPipe implements PipeTransform {
  transform(value: number | string): Money {
    value = String(value);
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
