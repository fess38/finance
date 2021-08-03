import { Money } from '../core/model/model';
import { MoneyDecoderPipe } from './money-decoder.pipe';

describe('MoneyDecoderPipe', () => {
  it('test1', () => {
    const pipe = new MoneyDecoderPipe();
    expect(new Money({ units: 1 })).toEqual(pipe.transform('1'));
  });

  it('test2', () => {
    const pipe = new MoneyDecoderPipe();
    expect(new Money({ units: 1, micros: 12300 })).toEqual(pipe.transform('1.0123'));
  });

  it('test2', () => {
    const pipe = new MoneyDecoderPipe();
    expect(new Money({ units: 0 })).toEqual(pipe.transform(''));
  });
});
