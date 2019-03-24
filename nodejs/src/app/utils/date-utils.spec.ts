import { Date_ } from '../core/model/model';
import { DateUtils } from './date-utils';

describe('DateUtils', () => {
  it('should return 2019-01-12 date', () => {
    const actual = DateUtils.formatDate(new Date(2019, 0, 12, 1, 0, 0));
    expect('2019-01-12').toEqual(actual);
  });

  it('should return 2019-01-01 date', () => {
    const actual = DateUtils.formatDate(new Date(2019, 0, 1, 1, 0, 0));
    expect('2019-01-01').toEqual(actual);
  });

  it('should return 2019-01-05', () => {
    const expected = new Date_({ year: 2019, month: 1, day: 5 });
    expect(expected).toEqual(DateUtils.parseDate_('2019-01-05'));
  });
});
