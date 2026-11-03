import {formatAxisPrice} from 'super-app-showcase-sdk';

describe('formatAxisPrice', () => {
  it.each([
    [
      [3865, 3870, 3875, 3880],
      ['$3.865k', '$3.87k', '$3.875k', '$3.88k'],
    ],
    [
      [109000, 109100, 109200],
      ['$109k', '$109.1k', '$109.2k'],
    ],
    [
      [176.5, 177, 177.5, 178],
      ['$176.5', '$177', '$177.5', '$178'],
    ],
    [
      [2.31, 2.32, 2.33],
      ['$2.31', '$2.32', '$2.33'],
    ],
    [
      [0.652, 0.654, 0.656],
      ['$0.652', '$0.654', '$0.656'],
    ],
  ])('gives each tick of %j its own label', (ticks, expected) => {
    expect(ticks.map(formatAxisPrice)).toEqual(expected);
  });
});
