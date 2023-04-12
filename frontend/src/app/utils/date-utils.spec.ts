import { Date_ } from '../core/model/model';
import { DateUtils } from './date-utils';

describe('DateUtils', () => {
  it('should return 2019-01-12 date', () => {
    const actual = DateUtils.formatDate(new Date(2019, 0, 12, 1, 0, 0));
    expect(actual).toEqual('2019-01-12');
  });

  it('should return 2019-01-01 date', () => {
    const actual = DateUtils.formatDate(new Date(2019, 0, 1, 1, 0, 0));
    expect(actual).toEqual('2019-01-01');
  });

  it('should return 2019-01-05', () => {
    const expected = new Date_({ year: 2019, month: 1, day: 5 });
    expect(DateUtils.parseDate_('2019-01-05')).toEqual(expected);
  });

  it('should return 28', () => {
    const expected = 28;
    expect(DateUtils.dates(2019, 2).length).toEqual(expected);
  });

  it('should return 29', () => {
    const expected = 29;
    expect(DateUtils.dates(2020, 2).length).toEqual(expected);
  });

  it('should return 31', () => {
    const expected = 31;
    expect(DateUtils.dates(2020, 3).length).toEqual(expected);
  });

  it('should return 2021-03-05', () => {
    const expected = '2021-03-09';
    expect(DateUtils.formatDate(DateUtils.addDays(DateUtils.parseDate('2021-02-01'), 36))).toEqual(expected);
  });
});
