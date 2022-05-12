export function channelStyles(index, channels) {
  const { stroke: S, fill: F } = channels;
  // 只有当 stroke 和 fill 这两个通道被指定的时候才会有用
  return {
    ...(S && { stroke: S[index] }),
    ...(F && { fill: F[index] }),
  };
}

export function groupChannelStyles([index], channels) {
  return channelStyles(index, channels);
}
