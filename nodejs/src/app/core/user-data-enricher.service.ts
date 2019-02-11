import * as _ from 'underscore';
import { Account, Category, Dump, FamilyMember, SubCategory, Transaction } from './model/model';

export class UserDataEnricherService {
  enrich(dump: Dump): void {
    dump.accounts.forEach(x => {
      x.transactionAmount = 0;
      x.balance = 0;
    });
    dump.categories.forEach(x => x.transactionAmount = 0);
    dump.subCategories.forEach(x => x.transactionAmount = 0);
    dump.familyMembers.forEach(x => x.transactionAmount = 0);

    this.enrichEnity(dump, dump.accounts as Account[], 'accountIdFrom');
    this.enrichEnity(dump, dump.accounts as Account[], 'accountIdTo');
    this.enrichEnity(dump, dump.categories as Category[], 'categoryId');
    this.enrichEnity(dump, dump.subCategories as SubCategory[], 'subCategoryId');
    this.enrichEnity(dump, dump.familyMembers as FamilyMember[], 'familyMemberId');
  }

  private enrichEnity(dump: Dump, values: Account[] | Category[] | SubCategory[] | FamilyMember[],
                      attributeName: string): void {
    const map = new Map<number, Account | Category | SubCategory | FamilyMember>();
    values.forEach(x => map.set(x.id as number, x));

    _.chain(dump.transactions)
      .filter(x => !x.isDeleted && x[attributeName] > 0)
      .filter(x => map.has(x[attributeName]))
      .groupBy(x => x[attributeName])
      .forEach((v, k) => {
        const entity = map.get(Number(k));
        entity.transactionAmount = entity.transactionAmount as number + v.length;
        if ('balance' in entity && map.size > 0) {
          if (attributeName == 'accountIdFrom') {
            const amount = this.sum(v as Transaction[], x => x.amountFrom);
            entity.balance = entity.balance as number - amount;
          } else if (attributeName == 'accountIdTo') {
            const amount = this.sum(v as Transaction[], x => x.amountTo);
            entity.balance = entity.balance as number + amount;
          }
        }
      });
  }

  private sum(transactions: Transaction[], mapper): number {
    return Number(_.chain(transactions)
      .map(mapper)
      .reduce((x1, x2) => Number(x1) + Number(x2), 0)) || 0;
  }
}