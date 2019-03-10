import { Pipe, PipeTransform } from '@angular/core';
import { Month } from '../core/model/model';

@Pipe({
  name: 'monthFormat'
})
export class MonthFormatPipe implements PipeTransform {
  transform(value: Month, args?: any): any {
    return `${value.year}-${value.month}-01`;
  }
}
