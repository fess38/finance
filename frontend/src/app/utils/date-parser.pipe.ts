import { Pipe, PipeTransform } from '@angular/core';
import { DateUtils } from './date-utils';

@Pipe({
  name: 'parseDate'
})
export class DateParserPipe implements PipeTransform {
  transform(created: string): any {
    return DateUtils.parseDate(created);
  }
}
