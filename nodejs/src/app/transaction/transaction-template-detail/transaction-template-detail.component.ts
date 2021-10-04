import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import { AppMode, Transaction, TransactionTemplate } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { TransactionDetailContext } from '../transaction-detail/transaction-detail.component';
import { TransactionMatcher } from '../transaction-matcher';

@Component({
  templateUrl: 'transaction-template-detail.component.html'
})
export class TransactionTemplateDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  private childPingerSubscription: Subscription;
  private isValidChildForm = false;
  transactionFrequency = new TransactionFrequency();
  transactionTemplate = new TransactionTemplate();
  transactionDetailContext: TransactionDetailContext = {
    forEmbed: true,
    showHeader: false,
    showDate: false,
    showComment: false,
    showOffBudget: false,
    showButtons: false,
    parentObservable: new Subject<any>()
  };
  daysOfWeek = '';
  daysOfMonth = '';

  ngOnInit(): void {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
    this.transactionTemplate.transaction = new Transaction();
    this.childPingerSubscription = interval(500).subscribe(() => {
      this.transactionDetailContext.parentObservable.next(0);
      if (!TransactionMatcher.match(this.transactionFrequency.transaction, this.transaction())) {
        this.transactionFrequency.transaction = new Transaction(this.transaction());
        this.transactionFrequency.updateFrequency(this.userdata.transactions());
      }
    });

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    const id = this.route.snapshot.paramMap.get('id');
    if (id != 'new') {
      this.subscription = this.userdata.subscribeOnInit(
        this.updateTransactionTemplateCallback(+id)
      );
    }
  }

  private updateTransactionTemplateCallback(id: number): any {
    return () => {
      const navigatedTransactionTemplate = this.userdata.findTranasctionTemplate(id);
      if (navigatedTransactionTemplate == null) {
        this.router.navigate(['/transaction_template']);
      } else {
        this.transactionTemplate = navigatedTransactionTemplate;
        this.daysOfWeek = this.transactionTemplate.daysOfWeek.join(',');
        this.daysOfMonth = this.transactionTemplate.daysOfMonth.join(',');
        this.transactionDetailContext.parentObservable.next(0);
      }
    };
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.childPingerSubscription) {
      this.childPingerSubscription.unsubscribe();
    }
  }

  update(transactionTemplate: TransactionTemplate): void {
    if (transactionTemplate.id == 0) {
      this.userdata.saveTransactionTemplate(transactionTemplate)
        .then(() => this.router.navigate(['/transaction_template/' + this.transactionTemplate.id]))
        .catch(error => {
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    } else {
      this.userdata.updateTransactionTemplate(transactionTemplate)
        .then(() => this.router.navigate(['/transaction_template']))
        .catch(error => {
          transactionTemplate.isDeleted = false;
          console.error(error.message);
          this.router.navigate(['/error']);
        });
    }
  }

  delete(transactionTemplate: TransactionTemplate): void {
    transactionTemplate.isDeleted = true;
    this.update(transactionTemplate);
  }

  viewTransactionTemplates(): void {
    this.router.navigate(['/transaction_template']);
  }

  transaction(): Transaction {
    return this.transactionTemplate.transaction as Transaction;
  }

  isValidForm(): boolean {
    return this.transactionTemplate.name.length > 0 && this.isValidChildForm
      && (this.transactionTemplate.interval > 0 || this.transactionTemplate.daysOfWeek.length > 0
        || this.transactionTemplate.daysOfMonth.length > 0);
  }

  onChildNotify(isValidChildForm: boolean): void {
    this.isValidChildForm = isValidChildForm;
  }

  onDaysOfWeekChange() {
    const pattern = '^([1-7]|([1-7],)+|([1-7](,[1-7])*))$';
    while (this.daysOfWeek.match(pattern) == null && this.daysOfWeek.length > 0) {
      this.daysOfWeek = this.daysOfWeek.substr(0, this.daysOfWeek.length - 1);
    }
    this.transactionTemplate.daysOfWeek = this.formatDays(this.daysOfWeek);
  }

  onDaysOfMonthChange() {
    const pattern = '^($p|($p,)+|($p(,$p)*))$'.split('\$p').join('([1-9]|[12]\\d|3[01])');
    while (this.daysOfMonth.match(pattern) == null && this.daysOfMonth.length > 0) {
      this.daysOfMonth = this.daysOfMonth.substr(0, this.daysOfMonth.length - 1);
    }
    this.transactionTemplate.daysOfMonth = this.formatDays(this.daysOfMonth);
  }

  private formatDays(value: string): number[] {
    const days = new Set<number>();
    value.split(',')
      .filter(x => x != '')
      .map(x => Number(x))
      .forEach(x => days.add(x));
    return Array.from(days).sort((a, b) => a < b ? -1 : 1);
  }
}

class TransactionFrequency {
  transaction: Transaction = new Transaction();
  frequency = 0;

  updateFrequency(transactions: Transaction[]): void {
    const yearAgo: string = DateUtils.formatDate(DateUtils.addDays(new Date(), -365));
    const matchedTransactionsAmount: number = new Set<string>(transactions
      .filter(x => x.created > yearAgo)
      .filter(x => TransactionMatcher.match(x, this.transaction))
      .map(x => x.created)
    ).size;
    if (matchedTransactionsAmount > 0) {
      this.frequency = Math.round(365. / matchedTransactionsAmount);
    } else {
      this.frequency = 0;
    }
  }
}
