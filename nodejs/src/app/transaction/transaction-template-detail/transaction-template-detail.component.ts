import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject, Subscription } from 'rxjs';
import * as _ from 'underscore';
import { Transaction, TransactionTemplate } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';

@Component({
  templateUrl: 'transaction-template-detail.component.html'
})
export class TransactionTemplateDetailComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService,
              private route: ActivatedRoute,
              private router: Router) {}

  private subscription: Subscription;
  private observable = new Subject<any>();
  private isValidChildForm = false;
  private childPingerSubscription: Subscription;
  transactionTemplate: TransactionTemplate = new TransactionTemplate();
  daysOfWeek: string = '';
  daysOfMonth: string = '';

  ngOnInit(): void {
    this.transactionTemplate.transaction = new Transaction();
    this.childPingerSubscription = interval(500).subscribe(() => {
      this.observable.next(0);
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

  isReadOnly(): boolean {
    return this.userdata.isReadOnly();
  }

  update(transactionTemplate: TransactionTemplate): void {
    if (transactionTemplate.id == 0) {
      console.log(transactionTemplate);
      this.userdata.saveTransactionTemplate(transactionTemplate)
        .then(() => {
          this.transactionTemplate.name = '';
          this.transactionTemplate.interval = 0;
          this.transactionTemplate.daysOfWeek = [];
          this.transactionTemplate.daysOfMonth = [];
        })
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

  isNewTransactionTemplate(): boolean {
    return this.transactionTemplate.id == 0;
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
    return _.chain(value.split(','))
      .filter(x => x != '')
      .map(x => Number(x))
      .unique()
      .sortBy(x => x)
      .map(x => x)
      .value();
  }
}
