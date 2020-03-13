import { Long } from 'protobufjs';
import { Account, Category, Dump, FamilyMember, SubCategory, Transaction, TransactionTemplate } from '../model/model';

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

    const templateTransactions: Transaction[] = dump.transactionTemplates
      .filter(x => !x.isDeleted)
      .map(x => x.transaction as Transaction);
    const group = new Map<number, Transaction[]>();
    dump.transactions.concat(templateTransactions)
      .filter(x => !x.isDeleted && x[attributeName] > 0)
      .filter(x => map.has(x[attributeName]))
      .forEach(x => {
        const key: number = x[attributeName];
        group.set(key, (group.get(key) || []).concat(x as Transaction));
      });
    group.forEach((v, k) => {
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
    return Number(transactions.map(mapper).reduce((x1, x2) => Number(x1) + Number(x2), 0)) || 0;
  }

  merge(source: Dump, update: Dump): Dump {
    const result: Dump = Dump.fromObject(update);

    const idsToUpdate: (number | Long)[] = [];
    update.accounts.forEach(x => idsToUpdate.push(x.id));
    update.categories.forEach(x => idsToUpdate.push(x.id));
    update.subCategories.forEach(x => idsToUpdate.push(x.id));
    update.familyMembers.forEach(x => idsToUpdate.push(x.id));
    update.transactions.forEach(x => idsToUpdate.push(x.id));
    update.transactionTemplates.forEach(x => idsToUpdate.push(x.id));

    result.settings = update.settings || source.settings;

    source.accounts
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.accounts.push(x as Account));

    source.categories
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.categories.push(x as Category));

    source.subCategories
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.subCategories.push(x as SubCategory));

    source.familyMembers
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.familyMembers.push(x as FamilyMember));

    source.transactions
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.transactions.push(x as Transaction));

    source.transactionTemplates
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.transactionTemplates.push(x as TransactionTemplate));
    return result;
  }
}
