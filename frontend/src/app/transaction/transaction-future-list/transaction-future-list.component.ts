import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Subscription } from 'rxjs';
import { AppMode, Transaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { AlertService } from '../../utils/alert/alert.service';
import { TransactionDetailContext } from '../transaction-detail/transaction-detail.component';
import { NamedTransaction, TransactionTemplateResolver } from '../transaction-template-resolver';

@Component({
  templateUrl: 'transaction-future-list.component.html'
})
export class TransactionFutureListComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private alertService: AlertService) {}

  private subscription: Subscription;
  private childPingerSubscription: Subscription;
  private resolver = new TransactionTemplateResolver();
  isValidForm = false;
  isShowForm = false;
  transactionDetailContext: TransactionDetailContext = {
    forEmbed: true,
    showHeader: false,
    showDate: true,
    showComment: false,
    showOffBudget: true,
    showButtons: false,
    parentObservable: new Subject<any>()
  };
  namedTransactions: NamedTransaction[] = [];
  activeTransaction = new Transaction();

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
    this.subscription = this.userdata.subscribeOnInit(() => this.onInitCallback());
    this.childPingerSubscription = interval(500).subscribe(() => {
      this.transactionDetailContext.parentObservable.next(0);
    });
  }

  private onInitCallback(): void {
    this.updateNamedTransactions();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.childPingerSubscription) {
      this.childPingerSubscription.unsubscribe();
    }
  }

  onTransactionClick(transaction: Transaction): void {
    this.activeTransaction = new Transaction(transaction);
    this.isShowForm = true;
  }

  onChildNotify(isValidChildForm: boolean): void {
    this.isValidForm = isValidChildForm;
  }

  save(transaction: Transaction): void {
    this.userdata.saveTransaction(transaction)
      .then(() => {
        this.activeTransaction = new Transaction();
        this.isShowForm = false;
        this.updateNamedTransactions();
      })
      .catch(error => {
        console.error(error.message);
        this.alertService.error(transaction.isDeleted ? 'error.delete' : 'error.save');
      });
  }

  delete(transaction: Transaction): void {
    transaction.isDeleted = true;
    this.save(transaction);
  }

  private updateNamedTransactions(): void {
    this.namedTransactions = this.resolver.resolve(
      this.userdata.transactionTemplates(),
      this.userdata.allTransactions()
    );
    this.namedTransactions.sort((a, b) => {
      return a.transaction.created < b.transaction.created ? -1 : 1;
    });
  }
}
