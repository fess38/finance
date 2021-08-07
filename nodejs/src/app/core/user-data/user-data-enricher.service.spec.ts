import { Account, DataStorage, FamilyMember, Money, Security, SecurityTransaction, Transaction, TransactionTemplate } from '../model/model';
import { UserDataEnricherService } from './user-data-enricher.service';
import Type = SecurityTransaction.Type;

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
    const dataStorage = new DataStorage();
    dataStorage.transactions = Array.from(Array(5).keys()).map(x => new Transaction(transaction));
    dataStorage.transactions[0].familyMemberId = 100;
    dataStorage.transactions[1].familyMemberId = 100;
    dataStorage.transactions[1].isDeleted = true;
    dataStorage.transactions[2].familyMemberId = 100;
    dataStorage.familyMembers = [new FamilyMember(familyMember)];
    dataStorage.familyMembers[0].transactionAmount = 100;
    dataStorage.transactionTemplates = Array.from(Array(2).keys())
      .map(x => new TransactionTemplate({
        name: 'foo',
        interval: 1,
        transaction: new Transaction(transaction)
      }));
    dataStorage.transactionTemplates[0].transaction.familyMemberId = 100;
    dataStorage.transactionTemplates[1].transaction.familyMemberId = 110;

    enricher.enrich(dataStorage);
    expect(3).toEqual(<number>dataStorage.familyMembers[0].transactionAmount);
  });

  it('#enrich account balance', () => {
    const dataStorage = new DataStorage();
    dataStorage.transactions = Array.from(Array(5).keys()).map(x => new Transaction(transaction));
    dataStorage.transactionTemplates = Array.from(Array(2).keys())
      .map(x => new TransactionTemplate({
        name: 'foo',
        interval: 1,
        transaction: new Transaction(transaction)
      }));
    dataStorage.accounts = [new Account(account), new Account(account)];
    dataStorage.accounts[0].id = 10;
    dataStorage.accounts[1].id = 11;
    enricher.enrich(dataStorage);

    expect(-500).toEqual(<number>dataStorage.accounts[0].balance);
    expect(7).toEqual(<number>dataStorage.accounts[0].transactionAmount);
    expect(505).toEqual(<number>dataStorage.accounts[1].balance);
    expect(7).toEqual(<number>dataStorage.accounts[1].transactionAmount);
  });

  it('#enrich security', () => {
    const dataStorage = new DataStorage();
    dataStorage.securities = [new Security({
      'id': 1,
      'name': 'foo',
      'currencyId': 1,
      'price': new Money({ units: 1 })
    })];
    dataStorage.securityTransactions = [
      new SecurityTransaction({
        date: '1970-01-01',
        securityId: 2,
        type: Type.BUY,
        price: new Money({ units: 1 }),
        exchangeRate: new Money({ units: 1 }),
        purchaseFee: new Money({ units: 0 }),
        serviceFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        date: '1970-01-01',
        securityId: 1,
        type: Type.BUY,
        price: new Money({ units: 1 }),
        exchangeRate: new Money({ units: 1 }),
        purchaseFee: new Money({ units: 0 }),
        serviceFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        date: '1970-01-01',
        securityId: 1,
        type: Type.BUY,
        price: new Money({ units: 1 }),
        exchangeRate: new Money({ units: 1 }),
        purchaseFee: new Money({ units: 0 }),
        serviceFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        isDeleted: true,
        date: '1970-01-01',
        securityId: 1,
        type: Type.BUY,
        price: new Money({ units: 1 }),
        exchangeRate: new Money({ units: 1 }),
        purchaseFee: new Money({ units: 0 }),
        serviceFee: new Money({ units: 0 })
      })
    ];
    enricher.enrich(dataStorage);

    expect(2).toEqual(<number>dataStorage.securities[0].transactionAmount);
  });
});
