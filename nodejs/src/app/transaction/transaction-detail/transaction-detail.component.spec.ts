import { Transaction } from '../../core/model/model';
import { TransactionDetailComponent } from './transaction-detail.component';

describe('TransactionDetailComponent', () => {
  let component: TransactionDetailComponent;
  let transactionTemplate;

  beforeEach(() => {
    component = new TransactionDetailComponent(null, null, null, null);
    transactionTemplate = new Transaction({
      created: '2019-01-01',
      accountIdFrom: 10,
      accountIdTo: 11,
      amountFrom: 100,
      amountTo: 101,
      categoryId: 200
    });
  });

  it('#onChangeTransactionType to income', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.type = Transaction.Type.INCOME;
    component.onChangeTransactionType();

    const expected = new Transaction();
    expected.created = '2019-01-01';
    expected.accountIdFrom = -1;
    expected.accountIdTo = 0;
    expected.amountFrom = null;
    expected.amountTo = null;
    expected.categoryId = 0;

    expect(expected).toEqual(component.transaction);
  });

  it('#onChangeTransactionType to expense', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.type = Transaction.Type.EXPENSE;
    component.onChangeTransactionType();

    const expected = new Transaction();
    expected.created = '2019-01-01';
    expected.accountIdFrom = 0;
    expected.accountIdTo = -1;
    expected.amountFrom = null;
    expected.amountTo = null;
    expected.categoryId = 0;

    expect(expected).toEqual(component.transaction);
  });

  it('#onChangeTransactionType to transfer', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.type = Transaction.Type.TRANSFER;
    component.onChangeTransactionType();

    const expected = new Transaction();
    expected.created = '2019-01-01';
    expected.accountIdFrom = 0;
    expected.accountIdTo = 0;
    expected.amountFrom = null;
    expected.amountTo = null;
    expected.categoryId = -1;

    expect(expected).toEqual(component.transaction);
  });

  it('#onChangeCategory should set subCategoryId to 0', () => {
    component.transaction.subCategoryId = 123;
    component.onChangeCategory();
    expect(0).toEqual(component.transaction.subCategoryId);
  });

  it('#isNewTransaction should return false', () => {
    component.transaction.id = 123;
    expect(false).toEqual(component.isNewTransaction());
  });

  it('#isIncome should return true', () => {
    component.type = Transaction.Type.INCOME;
    expect(true).toEqual(component.isIncome());
  });

  it('#isIncome should return false', () => {
    component.type = Transaction.Type.TRANSFER;
    expect(false).toEqual(component.isIncome());
  });

  it('#isExpense should return true', () => {
    component.type = Transaction.Type.EXPENSE;
    expect(true).toEqual(component.isExpense());
  });

  it('#isExpense should return false', () => {
    component.type = Transaction.Type.TRANSFER;
    expect(false).toEqual(component.isExpense());
  });

  it('#isTransfer should return true', () => {
    component.type = Transaction.Type.TRANSFER;
    expect(true).toEqual(component.isTransfer());
  });

  it('#isTransfer should return false', () => {
    component.type = Transaction.Type.INCOME;
    expect(false).toEqual(component.isTransfer());
  });

  it('#isValidForm with CREATED', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.created = '';
    component.transaction.accountIdTo = -1;
    expect(['CREATED']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with INCOME_ACCOUNT_ID_FROM', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    expect(['INCOME_ACCOUNT_ID_FROM']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with INCOME_ACCOUNT_ID_TO', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.accountIdTo = 0;
    expect(['INCOME_ACCOUNT_ID_TO']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with INCOME_AMOUNT_TO', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.amountTo = 0;
    expect(['INCOME_AMOUNT_TO']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with INCOME_CATEGORY_ID', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.categoryId = 0;
    expect(['INCOME_CATEGORY_ID']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with EXPENSE_ACCOUNT_ID_FROM', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = 0;
    component.transaction.accountIdTo = -1;
    expect(['EXPENSE_ACCOUNT_ID_FROM']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with EXPENSE_ACCOUNT_ID_TO', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    expect(['EXPENSE_ACCOUNT_ID_TO']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with EXPENSE_AMOUNT_FROM', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    component.transaction.amountFrom = 0;
    expect(['EXPENSE_AMOUNT_FROM']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with EXPENSE_CATEGORY_ID', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    component.transaction.categoryId = -1;
    expect(['EXPENSE_CATEGORY_ID']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with TRANSFER_ACCOUNT_ID_FROM', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.categoryId = -1;
    expect(['TRANSFER_ACCOUNT_ID_FROM']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with TRANSFER_ACCOUNT_ID_TO', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    component.transaction.categoryId = -1;
    expect(['TRANSFER_ACCOUNT_ID_TO']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with TRANSFER_AMOUNT_FROM', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.amountFrom = -1;
    component.transaction.categoryId = -1;
    expect(['TRANSFER_AMOUNT_FROM']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with TRANSFER_AMOUNT_TO', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.amountTo = -1;
    component.transaction.categoryId = -1;
    expect(['TRANSFER_AMOUNT_TO']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm with CATEGORY_ID', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    expect(['CATEGORY_ID']).toEqual(component.isValidFormWithErrors());
  });

  it('#isValidForm valid', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    expect([]).toEqual(component.isValidFormWithErrors());
  });
});

