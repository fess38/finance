import { NumberFormatter } from './number_formatter';

describe('NumberFormatter', () => {
  it('should format 1', () => {
    expect('1').toEqual(NumberFormatter.format(1));
  });

  it('should format 10', () => {
    expect('10').toEqual(NumberFormatter.format(10));
  });

  it('should format 100', () => {
    expect('100').toEqual(NumberFormatter.format(100));
  });

  it('should format 1 000', () => {
    expect('1 000').toEqual(NumberFormatter.format(1000));
  });

  it('should format 10 000', () => {
    expect('10 000').toEqual(NumberFormatter.format(10000));
  });

  it('should format 100 000', () => {
    expect('100 000').toEqual(NumberFormatter.format(100000));
  });

  it('should format 1 000 000', () => {
    expect('1 000 000').toEqual(NumberFormatter.format(1000000));
  });
});
