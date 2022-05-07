import { compose } from './utils';

export function createCoordinate({
  x, y, width, height,
  transforms: coordinates = [],
}) {
  // coordinates 是坐标系变换函数
  // 它们在传入时便是接受了transformOptions参数的柯里化函数
  // 它们还需要我们传入 canvasOptions参数
  // coordinate 函数会返回一个由基本变换构成的数组，所以compose前需要通过 flat 把数组拍平
  // [[transpose, reflect], [transpose, reflect]]
  // -> [transpose, reflect, transpose, reflect]

  const transforms = coordinates
    .map((coordinate) => coordinate({
      x, y, width, height,
    }))
    .flat();
  const output = compose(...transforms);

  // 某些场景需要获得坐标轴的种类信息
  const types = transforms.map((d) => d.type());

  // 判断是否是极坐标
  output.isPolar = () => types.indexOf('polar') !== -1;

  // 判断是否转置
  // 只有奇数个 transpose 的时候才是转置
  // 这里使用了异或：a ^ b， 只有当 a 和 b 的值不相同时才为 true，否则为 false
  // eslint-disable-next-line no-bitwise
  output.isTranspose = () => types.reduce((is, type) => is ^ (type === 'transpose'), false);

  // 获得当前坐标系所映射的画布的中心
  output.center = () => [x + width / 2, y + height / 2];

  return output;
}
