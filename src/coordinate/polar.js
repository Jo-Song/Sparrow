import {
  translate, scale, polar as polarT, reflectY,
} from './transforms';
import { curry } from './utils';

function coordinate(transformOptions, canvasOptions) {
  const { width, height } = canvasOptions;
  const {
    innerRadius, outerRadius, startAngle, endAngle,
  } = transformOptions;

  const aspect = width / height;
  const sx = aspect > 1 ? 1 / aspect : 1;
  const sy = aspect > 1 ? 1 : aspect;

  return [
    // 以画布为中心沿 y 方向翻转
    translate(0, -0.5),
    reflectY(),
    translate(0, 0.5),

    // 调整角度和半径范围
    // outerRadius and innerRadius belong to [0, 1]
    scale(endAngle - startAngle, outerRadius - innerRadius),
    translate(startAngle, innerRadius),
    polarT(),
    // polarT() 转换后的范围为 [-1, 1]

    // 改变大小,使极坐标投射到画布后与内切画布
    scale(sx, sy),
    scale(0.5, 0.5),

    // 移动到画布中心
    translate(0.5, 0.5),

  ];
}

export const polar = curry(coordinate);
