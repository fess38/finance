import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import { Account, Category, FamilyMember, SubCategory, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtilsService as utils } from '../transaction-utils.service';

@Component({
  templateUrl: 'transaction-detail.component.html'
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  private maxTransactionsAccountId: number = 0;

  transaction: Transaction = new Transaction();
  type: Transaction.Type = Transaction.Type.EXPENSE;
  typesWithLabels = [
    { type: Transaction.Type.INCOME, label: 'common.income' },
    { type: Transaction.Type.EXPENSE, label: 'common.expense' },
    { type: Transaction.Type.TRANSFER, label: 'transaction_detail.transfer' }
  ];

  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // to reload component on params change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      this.subscription = this.userdata.subscribeOnInit(this.updateTransactionCallback(+id));
    } else {
      this.transaction.created = utils.currentDate();
      this.subscription = this.userdata.subscribeOnInit(this.newTransactionCallback());
      this.onChangeTransactionType();
    }
  }

  private updateTransactionCallback(id: number): any {
    return () => {
      const navigatedTransaction = this.userdata.transactions.filter(x => x.id == id && !x.isDeleted)[0];
      if (navigatedTransaction == null) {
        this.router.navigate(['/transaction']);
      } else {
        this.transaction = navigatedTransaction;
        this.type = utils.type(navigatedTransaction);
      }
    };
  }

  private newTransactionCallback(): any {
    return () => {
      this.maxTransactionsAccountId = _.chain(this.accounts())
        .sortBy(x => x.transactionAmount)
        .reverse()
        .map(x => Number(x.id))
        .value()[0] || 0;
      this.onChangeTransactionType();
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update(transaction: Transaction): void {
    transaction.amountFrom = transaction.amountFrom || 0;
    transaction.amountTo = transaction.amountTo || 0;

    if (transaction.id == 0) {
      this.userdata.saveTransaction(transaction)
        .then(() => {
          this.transaction.amountFrom = null;
          this.transaction.amountTo = null;
          this.transaction.comment = '';
          this.transaction.subCategoryId = 0;
          this.transaction.familyMemberId = 0;
        })
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateTransaction(transaction)
        .then(() => this.router.navigate(['/transaction']))
        .catch(error => {
          transaction.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(transaction: Transaction): void {
    transaction.isDeleted = true;
    this.update(transaction);
  }

  onChangeTransactionType(): void {
    this.transaction.accountIdFrom = 0;
    this.transaction.accountIdTo = 0;
    this.transaction.amountFrom = null;
    this.transaction.amountTo = null;
    this.transaction.categoryId = 0;

    if (this.isIncome()) {
      this.transaction.accountIdFrom = -1;
      this.transaction.accountIdTo = this.maxTransactionsAccountId;
    } else if (this.isExpense()) {
      this.transaction.accountIdFrom = this.maxTransactionsAccountId;
      this.transaction.accountIdTo = -1;
    } else if (this.isTransfer()) {
      this.transaction.categoryId = -1;
    }
  }

  accounts(): Account[] {
    return this.userdata.accounts.filter(x => !x.isDeleted && x.isVisible);
  }

  categories(): Category[] {
    return _.chain(this.userdata.categories)
      .filter(x => !x.isDeleted && x.isVisible)
      .filter(x => (this.isIncome() && x.isIncome) || (this.isExpense() && x.isExpense))
      .sortBy(x => x.name)
      .value();
  }

  onChangeCategory(): void {
    this.transaction.subCategoryId = 0;
  }

  subCategories(): SubCategory[] {
    return _.chain(this.userdata.subCategories)
      .filter(x => !x.isDeleted && x.isVisible)
      .filter(x => x.categoryId == this.transaction.categoryId)
      .sortBy(x => x.name)
      .value();
  }

  familyMembers(): FamilyMember[] {
    return _.chain(this.userdata.familyMembers)
      .filter(x => !x.isDeleted && x.isVisible)
      .sortBy(x => x.name)
      .value();
  }

  currency(account: Account): string {
    return this.userdata.currencies.filter(x => x.id == account.currencyId)[0].symbol;
  }

  isNewTransaction(): boolean {
    return this.transaction.id == 0;
  }

  isIncome(): boolean {
    return this.type == Transaction.Type.INCOME;
  }

  isExpense(): boolean {
    return this.type == Transaction.Type.EXPENSE;
  }

  isTransfer(): boolean {
    return this.type == Transaction.Type.TRANSFER;
  }

  isValidFormWithErrors(): string[] {
    const errors = [];
    const t = this.transaction;
    if (t.created.length == 0) {
      errors.push('CREATED');
    }

    if (this.isIncome()) {
      if (t.accountIdFrom != -1) {
        errors.push('INCOME_ACCOUNT_ID_FROM');
      }
      if (t.accountIdTo <= 0) {
        errors.push('INCOME_ACCOUNT_ID_TO');
      }
      if ((t.amountTo || 0) <= 0) {
        errors.push('INCOME_AMOUNT_TO');
      }
      if (t.categoryId <= 0) {
        errors.push('INCOME_CATEGORY_ID');
      }
    } else if (this.isExpense()) {
      if (t.accountIdFrom <= 0) {
        errors.push('EXPENSE_ACCOUNT_ID_FROM');
      }
      if (t.accountIdTo != -1) {
        errors.push('EXPENSE_ACCOUNT_ID_TO');
      }
      if ((t.amountFrom || 0) <= 0) {
        errors.push('EXPENSE_AMOUNT_FROM');
      }
      if (t.categoryId <= 0) {
        errors.push('EXPENSE_CATEGORY_ID');
      }
    } else if (this.isTransfer()) {
      if (t.accountIdFrom <= 0) {
        errors.push('TRANSFER_ACCOUNT_ID_FROM');
      }
      if (t.accountIdTo <= 0) {
        errors.push('TRANSFER_ACCOUNT_ID_TO');
      }
      if ((t.amountFrom || 0) < 0) {
        errors.push('TRANSFER_AMOUNT_FROM');
      }
      if ((t.amountTo || 0) < 0) {
        errors.push('TRANSFER_AMOUNT_TO');
      }
      if (t.categoryId != -1) {
        errors.push('CATEGORY_ID');
      }
    }
    return errors;
  }

  isValidForm(): boolean {
    return this.isValidFormWithErrors().length == 0;
  }

  viewTransactions(): void {
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() })
  }
}
