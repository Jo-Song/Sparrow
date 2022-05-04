import { createQuantile } from '../../src/scale/quantile';

describe('createQuantile', () => {
  test('createQuantile(options) finds right interval based on rank and returns corresponding value in range.', () => {
    const s = createQuantile({
      domain: new Array(10).fill(0).map((_, i) => i + 1),
      range: ['a', 'b', 'c', 'd'],
    });
    // threshold: [3.25, 5.5, 7.75]

    expect(s(1)).toBe('a');
    expect(s(3.2)).toBe('a');
    expect(s(3.3)).toBe('b');
    expect(s(4.5)).toBe('b');
    expect(s(5.4)).toBe('b');
    expect(s(5.6)).toBe('c');
    expect(s(7.8)).toBe('d');
    expect(s(10)).toBe('d');
  });
});
