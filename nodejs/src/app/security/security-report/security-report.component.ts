import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SecurityReport, SecurityTransaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { SecurityUtils } from '../security-utils';
import Type = SecurityTransaction.Type;

@Component({
  templateUrl: './security-report.component.html'
})
export class SecurityReportComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService) {}

  private subscription: Subscription;
  securityReports: SecurityReport[] = [];

  ngOnInit() {
    this.subscription = this.userdata.subscribeOnInit(() => this.securityReports = this.prepareSecurityReports());
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private prepareSecurityReports(): SecurityReport[] {
    let securityReports: SecurityReport[] = [];
    const securityTransactions = this.userdata.securityTransactions();
    this.processBuyTransactions(securityReports, securityTransactions);
    this.processSellTransactions(securityReports, securityTransactions);
    this.processCouponDividendTransactions(securityReports, securityTransactions);

    for (let securityReport of securityReports) {
      if (!securityReport.sellDate) {
        const security = this.userdata.findSecurity(securityReport.securityId);
        securityReport.income += (
          SecurityUtils.moneyToNumber(security.price)
          * SecurityUtils.moneyToNumber(security.exchangeRate)
          * securityReport.amount
        );
        securityReport.days = DateUtils.dayDiff(DateUtils.formatDate(), securityReport.buyDate);
      } else {
        securityReport.days = DateUtils.dayDiff(securityReport.sellDate, securityReport.buyDate);
      }
      securityReport.profit = securityReport.income - securityReport.expense;
      securityReport.annualProfit = 365 * securityReport.profit / securityReport.expense;
      if (securityReport.days > 0) {
        securityReport.annualProfit /= securityReport.days;
      }
    }
    securityReports.sort((a, b) => a.buyDate < b.buyDate ? 1 : -1);

    return securityReports;
  }

  private processBuyTransactions(securityReports: SecurityReport[], securityTransactions: SecurityTransaction[]): void {
    for (const securityTransaction of securityTransactions) {
      if (securityTransaction.type != Type.BUY) {
        continue;
      }
      securityReports.push(new SecurityReport({
        securityId: securityTransaction.securityId,
        buyDate: securityTransaction.date,
        amount: securityTransaction.amount,
        income: 0,
        expense: SecurityUtils.expense(securityTransaction)
      }));
    }
  }

  private processSellTransactions(securityReports: SecurityReport[],
                                  securityTransactions: SecurityTransaction[]): void {
    let newSecurityReports: SecurityReport[] = [];
    securityReports.sort((a, b) => a.buyDate < b.buyDate ? -1 : 1);
    for (const securityTransaction of securityTransactions) {
      if (securityTransaction.type != Type.SELL) {
        continue;
      }
      let sellAmount = securityTransaction.amount;
      for (let securityReport of this.filterReports(securityReports, securityTransaction)) {
        if (sellAmount == 0) {
          continue;
        }

        // split
        if (securityReport.amount > sellAmount) {
          const totalAmount = securityReport.amount;

          let newReport = new SecurityReport(securityReport);
          newReport.amount -= sellAmount;
          newReport.expense *= (newReport.amount / totalAmount);
          newSecurityReports.push(newReport);

          securityReport.amount = sellAmount;
          securityReport.expense *= (securityReport.amount / totalAmount);

          sellAmount = 0;
        } else {
          sellAmount -= securityReport.amount;
        }

        const exchangeRate = SecurityUtils.moneyToNumber(securityTransaction.exchangeRate);
        securityReport.sellDate = securityTransaction.date;
        securityReport.days = DateUtils.dayDiff(securityReport.sellDate, securityReport.buyDate);
        securityReport.income = (
          SecurityUtils.moneyToNumber(securityTransaction.price) * exchangeRate * securityReport.amount
        );
        securityReport.expense += (
          SecurityUtils.moneyToNumber(securityTransaction.purchaseFee) * exchangeRate
          + SecurityUtils.moneyToNumber(securityTransaction.serviceFee) * exchangeRate
        );
      }
    }
    newSecurityReports.forEach(x => securityReports.push(x));
  }

  private processCouponDividendTransactions(securityReports: SecurityReport[],
                                            securityTransactions: SecurityTransaction[]): void {
    for (const securityTransaction of securityTransactions) {
      if (securityTransaction.type != Type.COUPON && securityTransaction.type != Type.DIVIDENDS) {
        continue;
      }
      const filteredReports = this.filterReports(securityReports, securityTransaction);
      const exchangeRate = SecurityUtils.moneyToNumber(securityTransaction.exchangeRate);
      const income = (
        SecurityUtils.moneyToNumber(securityTransaction.price) * exchangeRate * securityTransaction.amount
      );
      const expense = (
        SecurityUtils.moneyToNumber(securityTransaction.purchaseFee) * exchangeRate
        + SecurityUtils.moneyToNumber(securityTransaction.serviceFee) * exchangeRate
      );
      const amount = filteredReports.map(x => x.amount).reduce((a, b) => a + b, 0);
      for (let report of filteredReports) {
        report.income += income * report.amount / amount;
        report.expense += expense * report.amount / amount;
      }
    }
  }

  private filterReports(securityReports: SecurityReport[], securityTransaction: SecurityTransaction): SecurityReport[] {
    return securityReports.filter(x => {
      return x.buyDate <= securityTransaction.date
        && x.securityId == securityTransaction.securityId
        && (!x.sellDate || x.sellDate > securityTransaction.date);
    });
  }

  securityName(securityId: number): string {
    return this.userdata.findSecurity(securityId).name;
  }
}
