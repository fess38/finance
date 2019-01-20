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
              private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      const callback = () => {
        const navigatedTransaction = this.userdata.transactions.filter(x => x.id == +id && !x.isDeleted)[0];
        if (navigatedTransaction == null) {
          this.router.navigate(['/transaction']);
        } else {
          this.transaction = navigatedTransaction;
        }
      };
      this.subscription = this.userdata.subscribeOnInit(callback);
    } else {
      this.transaction.created = this.currentDate();
      this.onChangeTransactionType();
    }
  }

  private currentDate(): string {
    const now: Date = new Date();
    let month = String(now.getUTCMonth() + 1);
    month = (month.length == 1 ? '0' : '') + month;
    return `${now.getUTCFullYear()}-${month}-${now.getUTCDate()}`;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  update(transaction: Transaction): void {
    if (transaction.id == 0) {
      this.userdata.saveTransaction(transaction)
        .then(newTransaction => {
          this.router.navigate(['/transaction/' + newTransaction.id]);
          this.transaction = newTransaction;
        })
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
    this.transaction.amountFrom = 0;
    this.transaction.amountTo = 0;
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
    return this.userdata.currencies
      .filter(x => x.id == account.currencyId)[0].symbol;
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

  isValidForm(): boolean {
    let result = true;
    const t = this.transaction;
    if (t.created.length == 0) {
      result = false;
    }

    if (!this.isTransfer() && t.categoryId <= 0) {
      result = false;
    }

    if (this.isIncome()) {
      if (t.accountIdFrom != -1) {
        result = false;
      }
      if (t.accountIdTo <= 0 || t.amountTo <= 0) {
        result = false;
      }
    } else if (this.isExpense()) {
      if (t.accountIdFrom <= 0 || t.amountFrom <= 0) {
        result = false;
      }
      if (t.accountIdTo != -1) {
        result = false;
      }
    } else if (this.isTransfer()) {
      if (t.accountIdFrom <= 0 || t.amountFrom <= 0 || t.accountIdTo < 0 || t.amountTo < 0
        || t.categoryId != -1) {
        result = false;
      }
    }
    return result;
  }
}
