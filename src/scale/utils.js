export function normalize(value, start, stop) {
  return (value - start) / (stop - start);
}

/**
 *
 * step0是生成指定数量的刻度的间隔
 * step1是最后生成的刻度的间隔
 * 我们希望step1满足两个条件：
 * 1. step1 = (10 ^ n) * b (其中 b=1,2,5)
 * 2. step0 和 step1 的误差尽量的小
 *
 */
export function tickStep(min, max, count) {
  const e10 = 10 ** 0.85;
  const e5 = 10 ** 0.5;
  const e2 = 10 ** 0.15;

  const step0 = Math.abs(max - min) / Math.max(0, count);
  let step1 = 10 ** Math.floor(Math.log10(step0));
  const error = step0 / step1;

  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return step1;
}

export function ticks(min, max, count) {
  const step = tickStep(min, max, count);
  // 让 start 和 stop 都是 step 的整数倍
  // 这样生成的ticks都是step的整数倍, 可以让可读性更强
  const start = Math.ceil(min / step);
  const stop = Math.floor(max / step);
  const n = stop - start + 1;
  // n 不一定等于count，所以生成的ticks的数量可能和指定的不一样
  const values = new Array(n);
  for (let i = 0; i < n; i += 1) {
    values[i] = round((start + i) * step);
  }
  return values;
}

/**
 * 简单解决js的精度问题：0.1 + 0.2 !== 0.3
 * @param {*} n
 * @returns
 */
export function round(n) {
  return Math.round(n * 1e12) / 1e12;
}

export function nice(domain, interval) {
  const [min, max] = domain;
  return [interval.floor(min), interval.ceil(max)];
}

export function ceil(n, base) {
  return base * Math.ceil(n / base);
}

export function floor(n, base) {
  return base * Math.floor(n / base);
}

//  通过对象序列化结果简单判断两个对象是否相等
export function equal(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function band({ domain, range, padding }) {
  const [r0, r1] = range;
  const n = domain.length;
  const step = (r1 - r0) / (n + padding);
  const bandWidth = step * (1 - padding);
  const interval = step - bandWidth;
  const x = (_, i) => r0 + interval + step * i;
  return {
    step, bandWidth, bandRange: new Array(n).fill(0).map(x),
  };
}

export function log(n, base) {
  return Math.log(n) / Math.log(base);
}
