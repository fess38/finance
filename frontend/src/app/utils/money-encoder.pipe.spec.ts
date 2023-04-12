import { Money } from '../core/model/model';
import { MoneyEncoderPipe } from './money-encoder.pipe';

describe('MoneyEncoderPipe', () => {
  it('test1', () => {
    const pipe = new MoneyEncoderPipe();
    expect(pipe.transform(new Money({ units: 12, micros: 340000 }))).toEqual('12.34');
  });

  it('test2', () => {
    const pipe = new MoneyEncoderPipe();
    expect(pipe.transform(new Money({ units: 12, micros: 0 }))).toEqual('12');
  });

  it('test3', () => {
    const pipe = new MoneyEncoderPipe();
    expect(pipe.transform(new Money({ units: 12, micros: 4560 }))).toEqual('12.00456');
  });

  it('test4', () => {
    const pipe = new MoneyEncoderPipe();
    expect(pipe.transform(null)).toEqual('');
  });
});
