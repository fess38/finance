import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppMode, SecurityReport, SecurityTransaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { SecurityUtils } from '../security-utils';
import Type = SecurityTransaction.Type;

@Component({
  templateUrl: 'security-report.component.html',
  styleUrls: ['security-report.component.css']
})
export class SecurityReportComponent implements OnInit, OnDestroy {
  constructor(private userdata: UserDataService) {}

  private subscription: Subscription;
  securityReports: SecurityReport[] = [];

  ngOnInit() {
    this.userdata.localSettings.appMode = AppMode.FINANCE;
    this.subscription = this.userdata.subscribeOnInit(() => {
      this.securityReports = this.prepareSecurityReports();
      this.securityReports.unshift(
        this.prepareFilteredSecurityReport('security_transaction.sold', x => !!x.sellDate)
      );
      this.prepareCurrencySecurityReports().forEach(x => this.securityReports.unshift(x));
      this.securityReports.unshift(
        this.prepareFilteredSecurityReport('security_transaction.current', x => !x.sellDate)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private prepareSecurityReports(): SecurityReport[] {
    const securityReports: SecurityReport[] = [];
    const securityTransactions = this.userdata.securityTransactions();
    this.processBuyTransactions(securityReports, securityTransactions);
    this.processSellTransactions(securityReports, securityTransactions);
    this.processCouponDividendTransactions(securityReports, securityTransactions);

    for (const securityReport of securityReports) {
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
      this.calculateProfit(securityReport);
    }
    return securityReports.sort((a, b) => a.buyDate < b.buyDate ? 1 : -1);
  }

  private processBuyTransactions(securityReports: SecurityReport[], securityTransactions: SecurityTransaction[]): void {
    for (const securityTransaction of securityTransactions) {
      if (securityTransaction.type != Type.BUY) {
        continue;
      }
      securityReports.push(new SecurityReport({
        name: this.userdata.findSecurity(securityTransaction.securityId).name,
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
    const newSecurityReports: SecurityReport[] = [];
    securityReports.sort((a, b) => a.buyDate < b.buyDate ? -1 : 1);
    for (const securityTransaction of securityTransactions) {
      if (securityTransaction.type != Type.SELL) {
        continue;
      }
      let sellAmount = securityTransaction.amount;
      for (const securityReport of this.filterReports(securityReports, securityTransaction)) {
        if (sellAmount == 0) {
          continue;
        }

        // split
        if (securityReport.amount > sellAmount) {
          const totalAmount = securityReport.amount;

          const newReport = new SecurityReport(securityReport);
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
          * (securityReport.amount / securityTransaction.amount)
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
      const expense = SecurityUtils.moneyToNumber(securityTransaction.purchaseFee) * exchangeRate;
      const amount = filteredReports.map(x => x.amount).reduce((a, b) => a + b, 0);
      for (const report of filteredReports) {
        report.income += income * report.amount / amount;
        report.expense += expense * report.amount / amount;
      }
    }
  }

  private filterReports(securityReports: SecurityReport[], securityTransaction: SecurityTransaction): SecurityReport[] {
    let filteredReports = securityReports.filter(x => {
      return x.buyDate <= securityTransaction.date
        && x.securityId == securityTransaction.securityId
        && (!x.sellDate || x.sellDate >= securityTransaction.date);
    });

    // for transactions after last sell
    if (filteredReports.length == 0 && securityReports.length > 0) {
      let maxBuyDate = '';
      securityReports
        .filter(x => x.securityId == securityTransaction.securityId)
        .forEach(x => {
          if (x.buyDate > maxBuyDate) {
            maxBuyDate = x.buyDate;
          }
        });
      filteredReports = securityReports.filter(x => {
        return x.securityId == securityTransaction.securityId && x.buyDate == maxBuyDate;
      });
    }

    return filteredReports;
  }

  private prepareFilteredSecurityReport(name: string, predicate: (x: SecurityReport) => boolean): SecurityReport {
    const result = new SecurityReport({ name: name });
    let sum = 0;
    for (const securityReport of this.securityReports) {
      if (securityReport.securityId && predicate(securityReport)) {
        result.days += securityReport.expense;
        result.amount += securityReport.amount;
        result.income += securityReport.income;
        result.expense += securityReport.expense;
        result.profit += securityReport.profit;
        sum += securityReport.expense * securityReport.days;
      }
    }
    result.days = Math.round(sum / result.expense);
    this.calculateProfit(result);
    return result;
  }

  private prepareCurrencySecurityReports(): SecurityReport[] {
    const currencySecurityReports: SecurityReport[] = [];

    const currencyIds = new Set<number>();
    for (const securityReport of this.securityReports) {
      if (securityReport.buyDate && !securityReport.sellDate) {
        currencyIds.add(this.userdata.findSecurity(securityReport.securityId).currencyId);
      }
    }

    for (const currencyId of currencyIds) {
      currencySecurityReports.push(this.prepareFilteredSecurityReport(
        this.userdata.findCurrency(currencyId).symbol,
        x => x.buyDate && !x.sellDate && this.userdata.findSecurity(x.securityId).currencyId == currencyId
      ));
    }

    return currencySecurityReports.sort((a, b) => a.profit < b.profit ? -1 : 1);
  }

  private calculateProfit(securityReport: SecurityReport): void {
    securityReport.profit = securityReport.income - securityReport.expense;
    securityReport.annualProfit = 365 * securityReport.profit / securityReport.expense;
    if (securityReport.days > 0) {
      securityReport.annualProfit /= securityReport.days;
    }
  }
}
