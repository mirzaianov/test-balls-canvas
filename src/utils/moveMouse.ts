import { Ball } from '../types';

const mouseSpeed = 5;

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
    const deltaX = mouseX - ball.x;
    const deltaY = mouseY - ball.y;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    if (distance <= ball.radius) {
      setBalls((prevBalls) => {
        const newBalls = [...prevBalls];
        if (newBalls[index].speed < mouseSpeed) {
          newBalls[index] = { ...newBalls[index], speed: mouseSpeed };
        }
        newBalls[index] = {
          ...newBalls[index],
          direction: { x: -deltaX, y: -deltaY },
        };
        return newBalls;
      });
    }
  });
};

export default moveMouse;
