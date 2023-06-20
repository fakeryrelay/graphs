export const calcAngle = (sideA: number, sideB: number) => {
  let x =  Math.atan(sideA / sideB);
  return Math.abs(x) * (180 / Math.PI)
};