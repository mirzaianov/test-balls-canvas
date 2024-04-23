import { Ball } from '../types';
import randomNumber from './randomNumber';
import randomBall from './randomBall';

const INITIAL_SPEED = 0;

const MIN_BALLS_QUANTITY = 7;
const MAX_BALLS_QUANTITY = 15;

const MIN_BALL_RADIUS = 30;
const MAX_BALL_RADIUS = 60;

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

const currentQuantity = randomNumber(MIN_BALLS_QUANTITY, MAX_BALLS_QUANTITY);

const initialBalls = (canvasWidth: number, canvasHeight: number): Ball[] => {
  const balls: Ball[] = [];

  for (let i = 0; i < currentQuantity; i += 1) {
    balls.push(
      randomBall(
        MIN_BALL_RADIUS,
        MAX_BALL_RADIUS,
        COLOR_RANGE,
        INITIAL_SPEED,
        canvasWidth,
        canvasHeight,
        balls,
      ),
    );
  }

  return balls;
};

export default initialBalls;
