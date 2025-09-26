export function projeter(ra, dec, canvasWidth, canvasHeight) {
  const x = canvasWidth / 2 + (ra - 12) * 10;
  const y = canvasHeight / 2 - dec * 2;
  return { x, y };
}
