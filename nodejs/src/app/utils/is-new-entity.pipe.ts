import { Pipe, PipeTransform } from '@angular/core';
import { Account, Category, FamilyMember, Note, Notepad, Security, SecurityTransaction, SubCategory, Transaction, TransactionTemplate } from '../core/model/model';

@Pipe({
  name: 'isNewEntity',
  pure: false
})
export class IsNewEntityPipe implements PipeTransform {
  // new entity
  transform(value: Account | Category | SubCategory | FamilyMember | Transaction | TransactionTemplate
    | Security | SecurityTransaction | Notepad | Note): boolean {
    return value.id == 0;
  }
}
