import { Pipe, PipeTransform } from '@angular/core';
import { UserDataService } from '../core/user-data/user-data.service';

@Pipe({
  name: 'locale'
})
export class LocalePipe implements PipeTransform {
  constructor(private userdata: UserDataService) {}

  transform(value: any): string {
    return this.userdata.locale();
  }
}
