import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from './date-utils';

@Pipe({
  name: 'createdFormat'
})
export class CreatedFormatPipe implements PipeTransform {
  transform(created: string, args?: any): any {
    return DateUtils.parseDate(created);
  }
}
