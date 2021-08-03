import { Money } from '../core/model/model';
import { MoneyEncoderPipe } from './money-encoder.pipe';

describe('MoneyEncoderPipe', () => {
  it('test1', () => {
    const pipe = new MoneyEncoderPipe();
    expect('12.34').toEqual(pipe.transform(new Money({ units: 12, micros: 340000 })));
  });

  it('test2', () => {
    const pipe = new MoneyEncoderPipe();
    expect('12').toEqual(pipe.transform(new Money({ units: 12, micros: 0 })));
  });

  it('test3', () => {
    const pipe = new MoneyEncoderPipe();
    expect('12.00456').toEqual(pipe.transform(new Money({ units: 12, micros: 4560 })));
  });

  it('test4', () => {
    const pipe = new MoneyEncoderPipe();
    expect('').toEqual(pipe.transform(null));
  });
});
