import { SecurityTransaction } from '../core/model/model';
import Type = SecurityTransaction.Type;

export class SecurityTransactionUtils {
  static typesWithLabels = [
    { type: Type.BUY, label: 'security_transaction.buy' },
    { type: Type.SELL, label: 'security_transaction.sell' },
    { type: Type.PURCHASE_FEE, label: 'security_transaction.purchase_fee' },
    { type: Type.SERVICE_FEE, label: 'security_transaction.service_fee' },
    { type: Type.COUPON, label: 'security_transaction.coupon' },
    { type: Type.DIVIDENDS, label: 'security_transaction.dividends' },
    { type: Type.TAX, label: 'security_transaction.tax' }
  ];
}
