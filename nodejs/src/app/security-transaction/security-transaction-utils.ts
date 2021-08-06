import { SecurityTransaction } from '../core/model/model';
import Type = SecurityTransaction.Type;

export class SecurityTransactionUtils {
  static typesWithLabels = [
    { type: Type.BUY, label: 'security_transaction_detail.buy' },
    { type: Type.SELL, label: 'security_transaction_detail.sell' },
    { type: Type.PURCHASE_FEE, label: 'security_transaction_detail.purchase_fee' },
    { type: Type.SERVICE_FEE, label: 'security_transaction_detail.service_fee' },
    { type: Type.COUPON, label: 'security_transaction_detail.coupon' },
    { type: Type.DIVIDENDS, label: 'security_transaction_detail.dividends' },
    { type: Type.TAX, label: 'security_transaction_detail.tax' }
  ];
}
