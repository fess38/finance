import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Account, Category, FamilyMember, SubCategory, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionCriteriaService as Criteria } from '../transaction-criteria.service';
import { TransactionUtils } from '../transaction-utils';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: 'transaction-detail.component.html'
})
export class TransactionDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private criteria: Criteria,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  private maxTransactionsAccountId = 0;
  private parentNotifyCallerSubscription: Subscription;

  @Input() transaction = new Transaction();
  @Input() context = new TransactionDetailContext();
  @Output() private notify = new EventEmitter<boolean>();
  type: Transaction.Type = Transaction.Type.EXPENSE;

  ngOnInit(): void {
    if (this.context.forEmbed && this.context.parentObservable) {
      if (this.transaction.created.length == 0) {
        this.transaction.created = DateUtils.formatDate();
        this.subscription = this.userdata.subscribeOnInit(this.newTransactionCallback());
      }
      this.parentNotifyCallerSubscription = this.context.parentObservable.subscribe(() => {
        // for async parent transaction creation
        const newType = TransactionUtils.type(this.transaction);
        if (this.type != newType && newType != Transaction.Type.UNDEFINED) {
          this.type = newType;
        }

        if (this.isValidForm()) {
          this.transaction.amountFrom = this.transaction.amountFrom || 0;
          this.transaction.amountTo = this.transaction.amountTo || 0;
        }
        this.notify.emit(this.isValidForm());
      });
      return;
    }

    // to reload component on params change
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      this.subscription = this.userdata.subscribeOnInit(this.updateTransactionCallback(+id));
    } else {
      this.transaction.created = DateUtils.formatDate();
      this.subscription = this.userdata.subscribeOnInit(this.newTransactionCallback());
      this.onChangeTransactionType();
    }
  }

  private updateTransactionCallback(id: number): any {
    return () => {
      const navigatedTransaction = this.userdata.findTranasction(id);
      if (navigatedTransaction == null) {
        this.router.navigate(['/transaction']);
      } else {
        this.transaction = navigatedTransaction;
        this.type = TransactionUtils.type(navigatedTransaction);
      }
    };
  }

  private newTransactionCallback(): any {
    return () => {
      this.maxTransactionsAccountId = this.accounts()
        .sort((a, b) => a.transactionAmount < b.transactionAmount ? 1 : -1)
        .map(x => Number(x.id))[0] || 0;
      this.onChangeTransactionType();
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.parentNotifyCallerSubscription) {
      this.parentNotifyCallerSubscription.unsubscribe();
    }
  }

  typesWithLabels(): any[] {
    return TransactionUtils.typesWithLabels;
  }

  update(transaction: Transaction): void {
    transaction.amountFrom = transaction.amountFrom || 0;
    transaction.amountTo = transaction.amountTo || 0;

    if (transaction.id == 0) {
      this.userdata.saveTransaction(transaction)
        .then(() => {
          this.transaction = new Transaction(transaction);
          this.transaction.id = 0;
          this.transaction.amountFrom = null;
          this.transaction.amountTo = null;
          this.transaction.comment = '';
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
    return this.userdata.accounts().filter(x => x.isVisible);
  }

  categories(): Category[] {
    return this.userdata.categories()
      .filter(x => x.isVisible)
      .filter(x => (this.isIncome() && x.isIncome) || (this.isExpense() && x.isExpense))
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  onChangeCategory(): void {
    this.transaction.subCategoryId = 0;
  }

  subCategories(): SubCategory[] {
    const subCategories: SubCategory[] = this.userdata.subCategories()
      .filter(x => x.isVisible)
      .filter(x => x.categoryId == this.transaction.categoryId);
    if (this.transaction.subCategoryId) {
      const subCategory: SubCategory = this.userdata.findSubCategory(this.transaction.subCategoryId);
      if (!subCategory.isVisible) {
        subCategories.push(subCategory);
      }
    }
    return subCategories.sort((a, b) => a.name < b.name ? -1 : 1);
  }

  familyMembers(): FamilyMember[] {
    return this.userdata.familyMembers()
      .filter(x => x.isVisible)
      .sort((a, b) => a.name < b.name ? -1 : 1);
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
    this.router.navigate(['/transaction'], { queryParams: this.criteria.toQueryParams() });
  }
}

export class TransactionDetailContext {
  forEmbed = false;
  showHeader = true;
  showDate = true;
  showComment = true;
  showOffBudget = true;
  showButtons = true;
  parentObservable: Subject<any>;
}
