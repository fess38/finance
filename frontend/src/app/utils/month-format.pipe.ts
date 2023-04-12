import { Pipe, PipeTransform } from '@angular/core';
import { Month } from '../core/model/model';
import { DateUtils } from './date-utils';

@Pipe({
  name: 'monthFormat'
})
export class MonthFormatPipe implements PipeTransform {
  transform(value: Month): string {
    return DateUtils.formatMonth(value);
  }
}
