import { IMoney, Money, SecurityTransaction } from '../core/model/model';
import { MoneyEncoderPipe } from '../utils/money-encoder.pipe';
import Type = SecurityTransaction.Type;

export class SecurityUtils {
  private static moneyEncoder = new MoneyEncoderPipe();

  static typesWithLabels = [
    { type: Type.BUY, label: 'security_transaction.buy' },
    { type: Type.SELL, label: 'security_transaction.sell' },
    { type: Type.COUPON, label: 'security_transaction.coupon' },
    { type: Type.DIVIDENDS, label: 'security_transaction.dividends' }
  ];

  static valueToMoney(value: number | string): Money {
    value = String(value);
    if (!value) {
      return new Money({ units: 0 });
    }
    if (value.indexOf('.') != -1) {
      const units = Number(value.split('.')[0]);
      let micros = value.split('.')[1];
      for (let i = micros.length; i < 6; ++i) {
        micros += '0';
      }
      return new Money({ units: units, micros: Number(micros) });
    } else {
      return new Money({ units: Number(value) });
    }
  }

  static moneyToNumber(value: Money | IMoney): number {
    return Number(this.moneyEncoder.transform(value));
  }

  static income(securityTransaction: SecurityTransaction): number {
    if (securityTransaction.type == Type.SELL || securityTransaction.type == Type.COUPON
      || securityTransaction.type == Type.DIVIDENDS) {
      const exchangeRate = this.moneyToNumber(securityTransaction.exchangeRate);
      return this.moneyToNumber(securityTransaction.price) * exchangeRate * securityTransaction.amount;
    }
    return 0;
  }

  static expense(securityTransaction: SecurityTransaction): number {
    const exchangeRate = this.moneyToNumber(securityTransaction.exchangeRate);
    let result = this.moneyToNumber(securityTransaction.purchaseFee) * exchangeRate
      + this.moneyToNumber(securityTransaction.serviceFee) * exchangeRate;
    if (securityTransaction.type == Type.BUY) {
      result += this.moneyToNumber(securityTransaction.price) * exchangeRate * securityTransaction.amount;
    }
    return result;
  }
}
