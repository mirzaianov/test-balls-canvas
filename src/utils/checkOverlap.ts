import { Ball } from '../types';

const checkOverlap = (
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

export default checkOverlap;
