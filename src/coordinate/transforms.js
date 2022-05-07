function transform(type, transformer) {
  transformer.type = () => type;
  return transformer;
}

// const map = translate(10, 10)
// map([0, 0]); // [10, 10]
export function translate(tx = 0, ty = 0) {
  return transform('translate', (([px, py]) => [px + tx, py + ty]));
}

// const map = scale(10, 10)
// map([2, 3]); // [20, 30]
export function scale(sx = 1, sy = 1) {
  return transform('scale', (([px, py]) => [px * sx, py * sy]));
}

// const map = reflect();
// map([1, 2]); // [-1, -2]
export function reflect() {
  return transform('reflect', scale(-1, -1));
}

export function reflectX() {
  return transform('reflectX', scale(-1, 1));
}

export function reflectY() {
  return transform('reflectY', scale(1, -1));
}

// const map = transpose();
// map([1, 2]); // [2, 1]
export function transpose() {
  return transform('transpose', ([px, py]) => [py, px]);
}

// 极坐标转换为笛卡尔坐标
export function polar() {
  return transform('polar', ([theta, radius]) => {
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    return [x, y];
  });
}
