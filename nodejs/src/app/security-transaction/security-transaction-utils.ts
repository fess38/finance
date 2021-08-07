import { IMoney, Money, SecurityTransaction } from '../core/model/model';
import { MoneyEncoderPipe } from '../utils/money-encoder.pipe';
import Type = SecurityTransaction.Type;

export class SecurityTransactionUtils {
  private static moneyEncoder = new MoneyEncoderPipe();

  static typesWithLabels = [
    { type: Type.BUY, label: 'security_transaction.buy' },
    { type: Type.SELL, label: 'security_transaction.sell' },
    { type: Type.COUPON, label: 'security_transaction.coupon' },
    { type: Type.DIVIDENDS, label: 'security_transaction.dividends' }
  ];

  static cost(securityTransaction: SecurityTransaction): number {
    const exchangeRate = this.decode(securityTransaction.exchangeRate);
    return Math.round(
      this.decode(securityTransaction.price) * exchangeRate * securityTransaction.amount
      + this.decode(securityTransaction.purchaseFee) * exchangeRate
      + this.decode(securityTransaction.serviceFee) * exchangeRate
    );
  }

  private static decode(value: Money | IMoney): number {
    return Number(this.moneyEncoder.transform(value));
  }
}
