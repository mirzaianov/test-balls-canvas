import { Ball } from '../types';

// Choose initial speed of the balls
// The higher the number, the faster they move
const INITIAL_BALL_SPEED = 5;

const moveMouse = (
  e: React.MouseEvent<HTMLCanvasElement>,
  balls: Ball[],
  setBalls: React.Dispatch<React.SetStateAction<Ball[]>>,
) => {
  const canvas = e.currentTarget;
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  balls.forEach((ball, index) => {
    const dx = mouseX - ball.x;
    const dy = mouseY - ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= ball.radius) {
      setBalls((prevBalls) => {
        const newBalls = [...prevBalls];

        if (newBalls[index].speed < INITIAL_BALL_SPEED) {
          newBalls[index] = { ...newBalls[index], speed: INITIAL_BALL_SPEED };
        }

        newBalls[index] = {
          ...newBalls[index],
          direction: { x: -dx, y: -dy },
        };

        return newBalls;
      });
    }
  });
};

export default moveMouse;
