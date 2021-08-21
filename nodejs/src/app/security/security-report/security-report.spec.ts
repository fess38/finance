import { Money, Security, SecurityReport, SecurityTransaction } from '../../core/model/model';
import { UserDataService } from '../../core/user-data/user-data.service';
import { DateUtils } from '../../utils/date-utils';
import { SecurityReportComponent } from './security-report.component';
import Type = SecurityTransaction.Type;

describe('SecurityRepoprtComponent', () => {
  const checkSecurityReport = (expected, actual) => {
    expect(expected.buyDate).toEqual(actual.buyDate);
    expect(expected.sellDate).toEqual(actual.sellDate);
    expect(expected.days).toEqual(actual.days);
    expect(expected.amount).toEqual(actual.amount);
    expect(expected.income).toEqual(actual.income);
    expect(expected.expense).toEqual(actual.expense);
    expect(expected.profit).toEqual(actual.profit);
    expect(expected.annualProfit).toBeCloseTo(actual.annualProfit, 2);
  };

  it('should prepare security reports 1', () => {
    const userdata = new UserDataService(null, null, null);
    (userdata as any).ds.securities = [
      new Security({
        id: 100,
        name: 'A',
        currencyId: 2,
        price: new Money({ units: 10 }),
        exchangeRate: new Money({ units: 25 })
      })
    ];
    (userdata as any).ds.securityTransactions = [
      new SecurityTransaction({
        id: 1000,
        date: '2021-05-01',
        securityId: 100,
        type: Type.BUY,
        price: new Money({ units: 5 }),
        exchangeRate: new Money({ units: 50 }),
        amount: 10,
        purchaseFee: new Money({ units: 7 })
      }),
      new SecurityTransaction({
        id: 1000,
        date: '2023-05-01',
        securityId: 100,
        type: Type.SELL,
        price: new Money({ units: 7 }),
        exchangeRate: new Money({ units: 60 }),
        amount: 10,
        purchaseFee: new Money({ units: 3 })
      }),
      new SecurityTransaction({
        id: 1000,
        date: '2022-05-01',
        securityId: 100,
        type: Type.DIVIDENDS,
        price: new Money({ units: 12 }),
        exchangeRate: new Money({ units: 55 }),
        amount: 1,
        purchaseFee: new Money({ units: 1 })
      })
    ];
    const component = new SecurityReportComponent(userdata);
    const expected = new SecurityReport({
      securityId: 100,
      buyDate: '2021-05-01',
      sellDate: '2023-05-01',
      days: 730,
      amount: 10,
      income: 4860,
      expense: 3085,
      profit: 1775,
      annualProfit: 0.287
    });
    const actual = (component as any).prepareSecurityReports()[0];
    checkSecurityReport(expected, actual);
  });

  it('should prepare security reports 2', () => {
    const userdata = new UserDataService(null, null, null);
    (userdata as any).ds.securities = [
      new Security({
        id: 100,
        name: 'A',
        currencyId: 2,
        price: new Money({ units: 10 }),
        exchangeRate: new Money({ units: 25 })
      })
    ];
    (userdata as any).ds.securityTransactions = [
      new SecurityTransaction({
        id: 1000,
        date: '2021-05-01',
        securityId: 100,
        type: Type.BUY,
        price: new Money({ units: 5 }),
        exchangeRate: new Money({ units: 1 }),
        amount: 5,
        purchaseFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        id: 1001,
        date: '2022-05-01',
        securityId: 100,
        type: Type.BUY,
        price: new Money({ units: 5 }),
        exchangeRate: new Money({ units: 1 }),
        amount: 5,
        purchaseFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        id: 1002,
        date: '2023-05-01',
        securityId: 100,
        type: Type.SELL,
        price: new Money({ units: 10 }),
        exchangeRate: new Money({ units: 1 }),
        amount: 10,
        purchaseFee: new Money({ units: 10 })
      })
    ];
    const component = new SecurityReportComponent(userdata);
    const expected = [
      new SecurityReport({
        securityId: 100,
        buyDate: '2022-05-01',
        sellDate: '2023-05-01',
        days: 365,
        amount: 5,
        income: 50,
        expense: 30,
        profit: 20,
        annualProfit: 0.666
      }),
      new SecurityReport({
        securityId: 100,
        buyDate: '2021-05-01',
        sellDate: '2023-05-01',
        days: 730,
        amount: 5,
        income: 50,
        expense: 30,
        profit: 20,
        annualProfit: 0.333
      })
    ];
    const actual = (component as any).prepareSecurityReports();
    checkSecurityReport(expected[0], actual[0]);
    checkSecurityReport(expected[1], actual[1]);
  });

  it('should prepare security reports 3', () => {
    const userdata = new UserDataService(null, null, null);
    (userdata as any).ds.securities = [
      new Security({
        id: 100,
        name: 'A',
        currencyId: 2,
        price: new Money({ units: 10 }),
        exchangeRate: new Money({ units: 1 })
      })
    ];
    (userdata as any).ds.securityTransactions = [
      new SecurityTransaction({
        id: 1000,
        date: '2021-05-01',
        securityId: 100,
        type: Type.BUY,
        price: new Money({ units: 5 }),
        exchangeRate: new Money({ units: 1 }),
        amount: 5,
        purchaseFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        id: 1001,
        date: '2022-05-01',
        securityId: 100,
        type: Type.SELL,
        price: new Money({ units: 4 }),
        exchangeRate: new Money({ units: 1 }),
        amount: 5,
        purchaseFee: new Money({ units: 0 })
      }),
      new SecurityTransaction({
        id: 1002,
        date: '2023-05-01',
        securityId: 100,
        type: Type.COUPON,
        price: new Money({ units: 5 }),
        exchangeRate: new Money({ units: 1 }),
        amount: 1,
        purchaseFee: new Money({ units: 0 })
      })
    ];
    const component = new SecurityReportComponent(userdata);
    const expected = new SecurityReport({
        securityId: 100,
        buyDate: '2021-05-01',
        sellDate: '2022-05-01',
        days: 365,
        amount: 5,
        income: 25,
        expense: 25,
        profit: 0,
        annualProfit: 0
      });
    const actual = (component as any).prepareSecurityReports()[0];
    checkSecurityReport(expected, actual);
  });

  it('should prepare security reports with split', () => {
    const userdata = new UserDataService(null, null, null);
    (userdata as any).ds.securities = [
      new Security({
        id: 100,
        name: 'A',
        currencyId: 2,
        price: new Money({ units: 10 }),
        exchangeRate: new Money({ units: 70 })
      })
    ];
    (userdata as any).ds.securityTransactions = [
      new SecurityTransaction({
        id: 1000,
        date: '2021-05-01',
        securityId: 100,
        type: Type.BUY,
        price: new Money({ units: 5 }),
        exchangeRate: new Money({ units: 50 }),
        amount: 10,
        purchaseFee: new Money({ units: 7 })
      }),
      new SecurityTransaction({
        id: 1000,
        date: '2021-05-31',
        securityId: 100,
        type: Type.SELL,
        price: new Money({ units: 7 }),
        exchangeRate: new Money({ units: 60 }),
        amount: 5,
        purchaseFee: new Money({ units: 3 })
      }),
      new SecurityTransaction({
        id: 1000,
        date: '2021-08-01',
        securityId: 100,
        type: Type.DIVIDENDS,
        price: new Money({ units: 12 }),
        exchangeRate: new Money({ units: 55 }),
        amount: 1,
        purchaseFee: new Money({ units: 1 })
      })
    ];
    const component = new SecurityReportComponent(userdata);
    const expected = [
      new SecurityReport({
        securityId: 100,
        buyDate: '2021-05-01',
        days: DateUtils.dayDiff(DateUtils.formatDate(), '2021-05-01'),
        amount: 5,
        income: 4160,
        expense: 1480,
        profit: 2680,
        annualProfit: 2680 / 1480 * 365 / DateUtils.dayDiff(DateUtils.formatDate(), '2021-05-01')
      }),
      new SecurityReport({
        securityId: 100,
        buyDate: '2021-05-01',
        sellDate: '2021-05-31',
        days: 30,
        amount: 5,
        income: 2100,
        expense: 1605,
        profit: 495.0,
        annualProfit: 3.75
      })
    ];
    const actual = (component as any).prepareSecurityReports();
    checkSecurityReport(expected[0], actual[0]);
    checkSecurityReport(expected[1], actual[1]);
  });
});
