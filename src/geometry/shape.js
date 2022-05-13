import { line as pathLine, area as pathArea } from './d';
import { contour } from './primitive';

// 绘制不同坐标系下面的圆
// 绘制圆的函数和渲染器里面绘制圆的区别在于这里需要考虑坐标系
export function circle(renderer, coordinate, {
  cx, cy, r, ...styles
}) {
  // 对圆心进行坐标变换
  const [px, py] = coordinate([cx, cy]);
  return renderer.circle({
    cx: px, cy: py, r, ...styles,
  });
}

export function text(renderer, coordinate, {
  x, y, rotate, text, ...styles
}) {
  const [px, py] = coordinate([x, y]);
  renderer.save();
  renderer.translate(px, py);
  renderer.rotate(rotate);
  const textElement = renderer.text({
    text, x: 0, y: 0, ...styles,
  });
  renderer.restore();
  return textElement;
}

export function link(renderer, coordinate, {
  x1, y1, x2, y2, ...styles
}) {
  const [p0, p1] = [[x1, y1], [x2, y2]].map(coordinate);
  return renderer.line({
    x1: p0[0], y1: p0[1], x2: p1[0], y2: p1[1], ...styles,
  });
}

export function line(renderer, coordinate, {
  X, Y, I: I0, ...styles
}) {
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;
  const points = I.map((i) => coordinate([X[i], Y[i]]));
  const d = pathLine(points);
  return renderer.path({ d, ...styles });
}

export function area(renderer, coordinate, {
  X1, Y1, X2, Y2, I: I0, ...styles
}) {
  // 首尾连接
  const I = coordinate.isPolar() ? [...I0, I0[0]] : I0;

  // 将点按照顺时针方向排列
  const points = [
    ...I.map((i) => [X1[i], Y1[i]]),
    ...I.map((i) => [X2[i], Y2[i]]).reverse(),
  ].map(coordinate);

  // 如果是在极坐标系下， 绘制等高线
  if (coordinate.isPolar()) {
    return contour(renderer, { points, ...styles });
  }

  // 否则直接绘制区域
  return renderer.path({ d: pathArea(points), ...styles });
}
