/**
 * 创建对单个通道的描述， 每一个通道都是一个对象， 它拥有的属性如下：
 * 属性名 描述 可选 默认值
 * name 属性的名字 必选 -
 * optional 该通道是否必选 必选 true
 * scale 需要的比例尺 可选
 *
 * @param {*} param0
 * @returns
 */
export function createChannel({
  name,
  optional = true,
  ...rest
}) {
  return ({ name, optional, ...rest });
}

export function createChannels(options = {}) {
  return {
    x: createChannel({ name: 'x', optional: false }),
    y: createChannel({ name: 'y', optional: false }),
    stroke: createChannel({ name: 'stroke' }),
    fill: createChannel({ name: 'fill' }),
    ...options,
  };
}
