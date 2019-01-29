import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Account, Category, FamilyMember, SubCategory, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data.service';

@Component({
  templateUrl: 'transaction-detail.component.html'
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  transaction: Transaction = new Transaction();
  action: String = 'expense';
  private subscription: Subscription;

  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // to reload component on params change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedTransaction = this.userdata.transactions.filter(x => x.id == +id && !x.isDeleted)[0];
        if (navigatedTransaction == null) {
          this.router.navigate(['/transaction']);
        } else {
          this.transaction = navigatedTransaction;
          this.action = this.defineAction(navigatedTransaction);
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      this.transaction.created = this.currentDate();
      this.onChangeTransactionType();
    }
  }

  currentDate(date: Date = new Date()): string {
    let month = String(date.getMonth() + 1);
    month = (month.length == 1 ? '0' : '') + month;
    return `${date.getFullYear()}-${month}-${date.getDate()}`;
  }

  private defineAction(transaction: Transaction): string {
    let result = 'transfer';
    if (transaction.accountIdFrom == -1) {
      result = 'income';
    } else if (transaction.accountIdTo == -1) {
      result = 'expense';
    }
    return result;
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
        .then(newTransaction => this.router.navigate(['/transaction/' + newTransaction.id]))
        .catch(error => console.error(error.message));
    } else {
      this.userdata.updateTransaction(transaction)
        .then(() => this.router.navigate(['/transaction/' + transaction.id]))
        .catch(error => console.error(error.message));
    }
  }

  delete(transaction: Transaction): void {
    transaction.isDeleted = true;
    this.update(transaction);
    this.router.navigate(['/transaction']);
  }

  onChangeTransactionType(): void {
    this.transaction.accountIdFrom = 0;
    this.transaction.accountIdTo = 0;
    this.transaction.amountFrom = null;
    this.transaction.amountTo = null;
    this.transaction.categoryId = 0;

    if (this.isIncome()) {
      this.transaction.accountIdFrom = -1;
    } else if (this.isExpense()) {
      this.transaction.accountIdTo = -1;
    } else if (this.isTransfer()) {
      this.transaction.categoryId = -1;
    }
  }

  accounts(): Array<Account> {
    return this.userdata.accounts.filter(x => !x.isDeleted && x.isVisible);
  }

  categories(): Array<Category> {
    return this.userdata.categories
      .filter(x => !x.isDeleted && x.isVisible)
      .filter(x => (this.isIncome() && x.isIncome) || (this.isExpense() && x.isExpense));
  }

  onChangeCategory(): void {
    this.transaction.subCategoryId = 0;
  }

  subCategories(): Array<SubCategory> {
    return this.userdata.subCategories
      .filter(x => !x.isDeleted && x.isVisible)
      .filter(x => x.categoryId == this.transaction.categoryId);
  }

  familyMembers(): Array<FamilyMember> {
    return this.userdata.familyMembers.filter(x => !x.isDeleted && x.isVisible);
  }

  currency(account: Account): string {
    return this.userdata.currencies.filter(x => x.id == account.currencyId)[0].symbol;
  }

  isNewTransaction(): boolean {
    return this.transaction.id == 0;
  }

  isIncome(): boolean {
    return this.action == 'income';
  }

  isExpense(): boolean {
    return this.action == 'expense';
  }

  isTransfer(): boolean {
    return !this.isIncome() && !this.isExpense();
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
      if (t.accountIdTo < 0) {
        errors.push('TRANSFER_ACCOUNT_ID_TO');
      }
      if ((t.amountFrom || 0) <= 0) {
        errors.push('TRANSFER_AMOUNT_FROM');
      }
      if ((t.amountTo || 0) <= 0) {
        errors.push('TRANSFER_AMOUNT_TO');
      }
      if (t.categoryId != -1) {
        errors.push('CATEGORY_ID');
      }
    }
    return errors;
  }

  isValidForm(): any {
    return this.isValidFormWithErrors().length == 0;
  }
}
