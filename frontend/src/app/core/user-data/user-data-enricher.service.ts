import { Long } from 'protobufjs';
import { Account, Category, DataStorage, FamilyMember, Note, Notepad, Security, SecurityTransaction, SubCategory, Transaction, TransactionTemplate } from '../model/model';
import Type = SecurityTransaction.Type;

export class UserDataEnricherService {
  enrich(dataStorage: DataStorage): void {
    dataStorage.accounts.forEach(x => {
      x.transactionAmount = 0;
      x.balance = 0;
    });
    this.enrichEnity(dataStorage, dataStorage.accounts as Account[], 'accountIdFrom');
    this.enrichEnity(dataStorage, dataStorage.accounts as Account[], 'accountIdTo');

    dataStorage.categories.forEach(x => x.transactionAmount = 0);
    this.enrichEnity(dataStorage, dataStorage.categories as Category[], 'categoryId');

    dataStorage.subCategories.forEach(x => x.transactionAmount = 0);
    this.enrichEnity(dataStorage, dataStorage.subCategories as SubCategory[], 'subCategoryId');

    dataStorage.familyMembers.forEach(x => x.transactionAmount = 0);
    this.enrichEnity(dataStorage, dataStorage.familyMembers as FamilyMember[], 'familyMemberId');

    dataStorage.securities.forEach(x => x.transactionAmount = 0);
    this.enrichSecurity(dataStorage);

    dataStorage.notepads.forEach(x => x.noteAmount = 0);
    this.enrichNotepad(dataStorage);

    // new entity
  }

  private enrichEnity(dataStorage: DataStorage, values: Account[] | Category[] | SubCategory[] | FamilyMember[],
                      attributeName: string): void {
    const map = new Map<number, Account | Category | SubCategory | FamilyMember>();
    values.forEach(x => map.set(x.id as number, x));

    const templateTransactions: Transaction[] = dataStorage.transactionTemplates
      .filter(x => !x.isDeleted)
      .map(x => Transaction.create(x.transaction));
    templateTransactions.forEach(x => {
      x.amountFrom = 0;
      x.amountTo = 0;
    });
    const group = new Map<number, Transaction[]>();
    dataStorage.transactions.concat(templateTransactions)
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

  private enrichSecurity(dataStorage: DataStorage): void {
    const securityTransactionCounter = new Map<number, number>();
    const securityAmountCounter = new Map<number, number>();
    dataStorage.securityTransactions.filter(x => !x.isDeleted).forEach(securityTransaction => {
      const securityId = securityTransaction.securityId;
      securityTransactionCounter.set(securityId, (securityTransactionCounter.get(securityId) || 0) + 1);

      let amount = 0;
      if (securityTransaction.type == Type.BUY) {
        amount += securityTransaction.amount;
      } else if (securityTransaction.type == Type.SELL) {
        amount -= securityTransaction.amount;
      }
      securityAmountCounter.set(securityId, (securityAmountCounter.get(securityId) || 0) + amount);
    });
    dataStorage.securities.forEach(security => {
      security.transactionAmount = securityTransactionCounter.get(security.id) || 0;
      security.amount = securityAmountCounter.get(security.id) || 0;
    });
  }

  private enrichNotepad(dataStorage: DataStorage): void {
    const noteCounter = new Map<number, number>();
    dataStorage.notes.filter(x => !x.isDeleted).forEach(note => {
      const notepadId = note.notepadId;
      noteCounter.set(notepadId, (noteCounter.get(notepadId) || 0) + 1);
    });
    dataStorage.notepads.forEach(notepad => {
      notepad.noteAmount = noteCounter.get(notepad.id) || 0;
    });
  }

  merge(source: DataStorage, update: DataStorage): DataStorage {
    const result: DataStorage = DataStorage.fromObject(update);

    const idsToUpdate: (number | Long)[] = [];
    update.accounts.forEach(x => idsToUpdate.push(x.id));
    update.categories.forEach(x => idsToUpdate.push(x.id));
    update.subCategories.forEach(x => idsToUpdate.push(x.id));
    update.familyMembers.forEach(x => idsToUpdate.push(x.id));
    update.transactions.forEach(x => idsToUpdate.push(x.id));
    update.transactionTemplates.forEach(x => idsToUpdate.push(x.id));
    update.securities.forEach(x => idsToUpdate.push(x.id));
    update.securityTransactions.forEach(x => idsToUpdate.push(x.id));
    update.notepads.forEach(x => idsToUpdate.push(x.id));
    update.notes.forEach(x => idsToUpdate.push(x.id));

    result.settings = update.settings || source.settings;
    result.idHolder = update.idHolder || source.idHolder;

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

    source.securities
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.securities.push(x as Security));

    source.securityTransactions
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.securityTransactions.push(x as SecurityTransaction));

    source.notepads
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.notepads.push(x as Notepad));

    source.notes
      .filter(x => !idsToUpdate.includes(x.id))
      .forEach(x => result.notes.push(x as Note));

    // new Entity

    return result;
  }
}
