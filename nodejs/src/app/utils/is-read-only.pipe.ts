import { Pipe, PipeTransform } from '@angular/core';
import { UserDataService } from '../core/user-data/user-data.service';

@Pipe({
  name: 'isReadOnly',
  pure: false
})
export class IsReadOnlyPipe implements PipeTransform {
  constructor(private userdata: UserDataService) {}

  transform(value: any): boolean {
    return this.userdata.isReadOnly();
  }
}
