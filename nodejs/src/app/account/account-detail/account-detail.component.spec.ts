import { Account, Transaction } from '../../core/model/model';
import { TransactionUtilsService } from '../../transaction/transaction-utils.service';
import { AccountDetailComponent } from './account-detail.component';

describe('AccountDetailComponent', () => {
  let component: AccountDetailComponent;
  let accountTemplate;

  beforeEach(() => {
    component = new AccountDetailComponent(null, null, null);
    accountTemplate = new Account({
      id: 101,
      name: 'foo',
      balance: 100,
      currencyId: 100
    });
  });

  it('should created transfer to increase balance', () => {
    const expected = new Transaction({
      created: TransactionUtilsService.currentDate(),
      accountIdFrom: 101,
      amountFrom: 0,
      accountIdTo: 101,
      amountTo: 10,
      categoryId: -1
    });
    expect(expected).toEqual(component.createAccountBalanceCorrection(accountTemplate, 110));
  });

  it('should created transfer to decrease balance', () => {
    const expected = new Transaction({
      created: TransactionUtilsService.currentDate(),
      accountIdFrom: 101,
      amountFrom: 10,
      accountIdTo: 101,
      amountTo: 0,
      categoryId: -1
    });
    expect(expected).toEqual(component.createAccountBalanceCorrection(accountTemplate, 90));
  });
});

