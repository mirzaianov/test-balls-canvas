import { Ball } from '../types';

const updateBallColor = (
  balls: Ball[],
  selectedBall: Ball | null,
  newColor: string,
): Ball[] => {
  return balls.map((ball) =>
    ball.x === selectedBall?.x && ball.y === selectedBall?.y
      ? { ...ball, color: newColor }
      : ball,
  );
};

export default updateBallColor;
