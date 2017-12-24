import { Currency } from './currency';

export class Account {
  id?: number;
  name: string;
  balance: number = 0;
  currency: Currency;
}