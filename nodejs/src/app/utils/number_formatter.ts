import { Long } from 'protobufjs';

export class NumberFormatter {
  static format(value: number | Long): string {
    let result = String(value);
    switch (result.length) {
      case 4:
        result = result[0] + ' ' + result.slice(1);
        break;
      case 5:
        result = result.slice(0, 2) + ' ' + result.slice(2);
        break;
      case 6:
        result = result.slice(0, 3) + ' ' + result.slice(3);
        break;
      case 7:
        result = result[0] + ' ' + result.slice(1, 4) + ' ' + result.slice(4);
        break;
      default:
    }
    return result;
  }
}
