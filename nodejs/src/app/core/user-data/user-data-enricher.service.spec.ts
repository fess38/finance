import { Account, Dump, FamilyMember, Transaction, TransactionTemplate } from '../model/model';
import { UserDataEnricherService } from './user-data-enricher.service';

describe('UserDataEnricherService', () => {
  const enricher = new UserDataEnricherService();
  const familyMember = new FamilyMember({ id: 100, name: 'foo' });
  const account = new Account({ id: 0, name: 'foo', currencyId: 12 });
  const transaction = new Transaction({
    created: '2019-01-01',
    accountIdFrom: 10,
    accountIdTo: 11,
    amountFrom: 100,
    amountTo: 101,
    categoryId: 200
  });

  it('#enrich familyMember', () => {
    const dump = new Dump();
    dump.transactions = Array.from(Array(5).keys())
      .map(x => new Transaction(transaction));
    dump.transactions[0].familyMemberId = 100;
    dump.transactions[1].familyMemberId = 100;
    dump.transactions[1].isDeleted = true;
    dump.transactions[2].familyMemberId = 100;
    dump.familyMembers = [new FamilyMember(familyMember)];
    dump.familyMembers[0].transactionAmount = 100;
    dump.transactionTemplates = Array.from(Array(2).keys())
      .map(x => new TransactionTemplate({
        name: 'foo',
        interval: 1,
        transaction: new Transaction(transaction)
      }));
    dump.transactionTemplates[0].transaction.familyMemberId = 100;
    dump.transactionTemplates[1].transaction.familyMemberId = 110;

    enricher.enrich(dump);
    expect(3).toEqual(<number>dump.familyMembers[0].transactionAmount);
  });

  it('#enrich account balance', () => {
    const dump = new Dump();
    dump.transactions = Array.from(Array(5).keys()).map(x => new Transaction(transaction));
    dump.transactionTemplates = Array.from(Array(2).keys())
      .map(x => new TransactionTemplate({
        name: 'foo',
        interval: 1,
        transaction: new Transaction(transaction)
      }));
    dump.accounts = [new Account(account), new Account(account)];
    dump.accounts[0].id = 10;
    dump.accounts[1].id = 11;
    enricher.enrich(dump);

    expect(-500).toEqual(<number>dump.accounts[0].balance);
    expect(7).toEqual(<number>dump.accounts[0].transactionAmount);
    expect(505).toEqual(<number>dump.accounts[1].balance);
    expect(7).toEqual(<number>dump.accounts[1].transactionAmount);
  });
});
