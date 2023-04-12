import { Money } from '../core/model/model';
import { SecurityUtils } from './security-utils';

describe('ValueToMoney', () => {
  it('test1', () => {
    expect(SecurityUtils.valueToMoney('1')).toEqual(new Money({ units: 1 }));
  });

  it('test2', () => {
    expect(SecurityUtils.valueToMoney('1.0123')).toEqual(new Money({ units: 1, micros: 12300 }));
  });

  it('test3', () => {
    expect(SecurityUtils.valueToMoney('')).toEqual(new Money({ units: 0 }));
  });
});
