import { Ball } from '../types';

const animateBalls = (
  balls: Ball[],
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = ball.color;
    context.fill();
  });
};

export default animateBalls;
