export const rand = (min, max) => Math.random() * (max - min) + min;

export const lerp = (a, b, i) => i * (b - a) + a;

export const colorLerp = (a, b, i) => {
  return (lerp(a & 0xff0000, b & 0xff0000, i) | 0) |
         (lerp(a & 0x00ff00, b & 0x00ff00, i) | 0) |
         (lerp(a & 0x0000ff, b & 0x0000ff, i) | 0);
}

export const colorGradient = (grad, i) => {
  let a, b;
  for (let stop = 0; stop < grad.length - 1; stop++) {
    a = grad[stop];
    b = grad[stop + 1];
    if (i <= b[0]) {
      break;
    }
  }
  return colorLerp(a[1], b[1], (i - a[0]) / (b[0] - a[0]));  
}

export const gradient = (grad, i) => {
  let a, b;
  for (let stop = 0; stop < grad.length - 1; stop++) {
    a = grad[stop];
    b = grad[stop + 1];
    if (i <= b[0]) {
      break;
    }
  }
  return lerp(a[1], b[1], (i - a[0]) / (b[0] - a[0]));
}
