export function line([p0, ...points]) {
  return [
    ['M', ...p0],
    ...points.map((p) => ['L', ...p]),
  ];
}

// 和 line 的区别就是进行了闭合操作
export function area(points) {
  return [
    ...line(points),
    ['Z'],
  ];
}
