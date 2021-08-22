import { Pipe, PipeTransform } from '@angular/core';
import { IMoney, Money } from '../core/model/model';

@Pipe({
  name: 'encodeMoney'
})
export class MoneyEncoderPipe implements PipeTransform {
  transform(value: Money | IMoney): string {
    if (!value) {
      return '';
    }

    const units = String(value.units);
    let micros = String(value.micros);
    const leadingZeros = 6 - micros.length;
    for (let i = 0; i < leadingZeros; ++i) {
      micros = '0' + micros;
    }
    for (let i = 5; i >= 0; --i) {
      if (micros[i] == '0') {
        micros = micros.substring(0, micros.length - 1);
      } else {
        break;
      }
    }
    return micros ? `${units}.${micros}` : `${units}${micros}`;
  }
}
