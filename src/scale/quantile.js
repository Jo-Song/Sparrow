import { createThreshold } from './threshold';

export function createQuantile({ domain, range, ...rest }) {
  const n = range.length - 1;
  const sortDomain = domain.sort((a, b) => a - b);
  // 使用 sortedDomain.length - 1 是因为我们10个数的间隔长度为9；
  const step = (sortDomain.length - 1) / (n + 1);
  const quantileDomain = new Array(n).fill(0).map((_, index) => {
    const i = (index + 1) * step;
    const i0 = Math.floor(i);
    const i1 = i0 + 1;
    const v0 = sortDomain[i0];
    const v1 = sortDomain[i1];
    return v0 * (i1 - i) + v1 * (i - i0);
  });
  return createThreshold({ domain: quantileDomain, range, ...rest });
}
