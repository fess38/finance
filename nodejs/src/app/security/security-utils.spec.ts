import { Money } from '../core/model/model';
import { SecurityUtils } from './security-utils';

describe('ValueToMoney', () => {
  it('test1', () => {
    expect(new Money({ units: 1 })).toEqual(SecurityUtils.valueToMoney('1'));
  });

  it('test2', () => {
    expect(new Money({ units: 1, micros: 12300 })).toEqual(SecurityUtils.valueToMoney('1.0123'));
  });

  it('test3', () => {
    expect(new Money({ units: 0 })).toEqual(SecurityUtils.valueToMoney(''));
  });
});
