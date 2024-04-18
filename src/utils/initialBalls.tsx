import { Ball } from '../types';

const INITIAL_SPEED = 0;

const MIN_BALLS_QUANTITY = 7;
const MAX_BALLS_QUANTITY = 15;

const MIN_BALL_RADIUS = 25;
const MAX_BALL_RADIUS = 55;

const COLOR_RANGE = [
  '#ff006e',
  '#58C7F3',
  '#ffbe0b',
  '#3a86ff',
  '#fb5607',
  '#8338ec',
  '#06d6a0',
  '#8ac926',
  '#5f0f40',
  '#9ef01a',
];

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const currentQuantity = randomNumber(MIN_BALLS_QUANTITY, MAX_BALLS_QUANTITY);

const randomColor = (colors: string[]) => {
  const index = randomNumber(0, colors.length - 1);

  return colors[index];
};

const doesOverlap = (
  x: number,
  y: number,
  radius: number,
  initialBalls: Ball[],
): boolean => {
  for (const ball of initialBalls) {
    const dx = ball.x - x;
    const dy = ball.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < ball.radius + radius) {
      return true;
    }
  }

  return false;
};

const randomBall = (
  canvasWidth: number,
  canvasHeight: number,
  initialBalls: Ball[],
): Ball => {
  let radius;
  let x;
  let y;

  do {
    radius = randomNumber(MIN_BALL_RADIUS, MAX_BALL_RADIUS);
    x = randomNumber(radius, canvasWidth - radius);
    y = randomNumber(radius, canvasHeight - radius);
  } while (doesOverlap(x, y, radius, initialBalls));

  const color: string = randomColor(COLOR_RANGE);
  const speed: number = INITIAL_SPEED;
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

const initialBalls = (canvasWidth: number, canvasHeight: number): Ball[] => {
  const balls: Ball[] = [];

  for (let i = 0; i < currentQuantity; i += 1) {
    balls.push(randomBall(canvasWidth, canvasHeight, balls));
  }

  return balls;
};

export default initialBalls;
