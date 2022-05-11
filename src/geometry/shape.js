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
