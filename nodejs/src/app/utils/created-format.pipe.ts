import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createdFormat'
})
export class CreatedFormatPipe implements PipeTransform {
  transform(created: string, args?: any): any {
    const tokens = created.split('-');
    return new Date(+tokens[0], +tokens[1] - 1, +tokens[2]);
  }
}
