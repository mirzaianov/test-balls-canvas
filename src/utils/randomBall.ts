import { Ball } from '../types';
import randomNumber from './randomNumber';
import randomColor from './randomColor';
import checkOverlap from './checkOverlap';

const randomBall = (
  minRadius: number,
  maxRadius: number,
  colors: string[],
  speed: number,
  canvasWidth: number,
  canvasHeight: number,
  initialBalls: Ball[],
): Ball => {
  let radius;
  let x;
  let y;

  do {
    radius = randomNumber(minRadius, maxRadius);
    x = randomNumber(radius, canvasWidth - radius);
    y = randomNumber(radius, canvasHeight - radius);
  } while (checkOverlap(x, y, radius, initialBalls));

  const color: string = randomColor(colors);
  const direction: { x: number; y: number } = { x: 0, y: 0 };

  return {
    x,
    y,
    radius,
    color,
    speed,
    direction,
  };
};

export default randomBall;
