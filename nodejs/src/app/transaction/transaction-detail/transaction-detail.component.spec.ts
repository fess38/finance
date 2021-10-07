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

    expect(component.transaction).toEqual(expected);
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

    expect(component.transaction).toEqual(expected);
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

    expect(component.transaction).toEqual(expected);
  });

  it('#onChangeCategory should set subCategoryId to 0', () => {
    component.transaction.subCategoryId = 123;
    component.onChangeCategory();
    expect(component.transaction.subCategoryId).toEqual(0);
  });

  it('#isIncome should return true', () => {
    component.type = Transaction.Type.INCOME;
    expect(component.isIncome()).toEqual(true);
  });

  it('#isIncome should return false', () => {
    component.type = Transaction.Type.TRANSFER;
    expect(component.isIncome()).toEqual(false);
  });

  it('#isExpense should return true', () => {
    component.type = Transaction.Type.EXPENSE;
    expect(component.isExpense()).toEqual(true);
  });

  it('#isExpense should return false', () => {
    component.type = Transaction.Type.TRANSFER;
    expect(component.isExpense()).toEqual(false);
  });

  it('#isTransfer should return true', () => {
    component.type = Transaction.Type.TRANSFER;
    expect(component.isTransfer()).toEqual(true);
  });

  it('#isTransfer should return false', () => {
    component.type = Transaction.Type.INCOME;
    expect(component.isTransfer()).toEqual(false);
  });

  it('#isValidForm with CREATED', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.created = '';
    component.transaction.accountIdTo = -1;
    expect(component.isValidFormWithErrors()).toEqual(['CREATED']);
  });

  it('#isValidForm with INCOME_ACCOUNT_ID_FROM', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    expect(component.isValidFormWithErrors()).toEqual(['INCOME_ACCOUNT_ID_FROM']);
  });

  it('#isValidForm with INCOME_ACCOUNT_ID_TO', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.accountIdTo = 0;
    expect(component.isValidFormWithErrors()).toEqual(['INCOME_ACCOUNT_ID_TO']);
  });

  it('#isValidForm with INCOME_AMOUNT_TO', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.amountTo = 0;
    expect(component.isValidFormWithErrors()).toEqual(['INCOME_AMOUNT_TO']);
  });

  it('#isValidForm with INCOME_CATEGORY_ID', () => {
    component.type = Transaction.Type.INCOME;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.categoryId = 0;
    expect(component.isValidFormWithErrors()).toEqual(['INCOME_CATEGORY_ID']);
  });

  it('#isValidForm with EXPENSE_ACCOUNT_ID_FROM', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = 0;
    component.transaction.accountIdTo = -1;
    expect(component.isValidFormWithErrors()).toEqual(['EXPENSE_ACCOUNT_ID_FROM']);
  });

  it('#isValidForm with EXPENSE_ACCOUNT_ID_TO', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    expect(component.isValidFormWithErrors()).toEqual(['EXPENSE_ACCOUNT_ID_TO']);
  });

  it('#isValidForm with EXPENSE_AMOUNT_FROM', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    component.transaction.amountFrom = 0;
    expect(component.isValidFormWithErrors()).toEqual(['EXPENSE_AMOUNT_FROM']);
  });

  it('#isValidForm with EXPENSE_CATEGORY_ID', () => {
    component.type = Transaction.Type.EXPENSE;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    component.transaction.categoryId = -1;
    expect(component.isValidFormWithErrors()).toEqual(['EXPENSE_CATEGORY_ID']);
  });

  it('#isValidForm with TRANSFER_ACCOUNT_ID_FROM', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdFrom = -1;
    component.transaction.categoryId = -1;
    expect(component.isValidFormWithErrors()).toEqual(['TRANSFER_ACCOUNT_ID_FROM']);
  });

  it('#isValidForm with TRANSFER_ACCOUNT_ID_TO', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    component.transaction.categoryId = -1;
    expect(component.isValidFormWithErrors()).toEqual(['TRANSFER_ACCOUNT_ID_TO']);
  });

  it('#isValidForm with TRANSFER_AMOUNT_FROM', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.amountFrom = -1;
    component.transaction.categoryId = -1;
    expect(component.isValidFormWithErrors()).toEqual(['TRANSFER_AMOUNT_FROM']);
  });

  it('#isValidForm with TRANSFER_AMOUNT_TO', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.amountTo = -1;
    component.transaction.categoryId = -1;
    expect(component.isValidFormWithErrors()).toEqual(['TRANSFER_AMOUNT_TO']);
  });

  it('#isValidForm with CATEGORY_ID', () => {
    component.type = Transaction.Type.TRANSFER;
    component.transaction = new Transaction(transactionTemplate);
    expect(component.isValidFormWithErrors()).toEqual(['CATEGORY_ID']);
  });

  it('#isValidForm valid', () => {
    component.transaction = new Transaction(transactionTemplate);
    component.transaction.accountIdTo = -1;
    expect(component.isValidFormWithErrors()).toEqual([]);
  });
});

