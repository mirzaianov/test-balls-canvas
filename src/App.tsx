import { useState, useRef, useEffect } from 'react';
import { Ball } from './types';
import initialBalls from './utils/initialBalls';
import animateBalls from './utils/animateBalls';
import moveMouse from './utils/moveMouse';
import moveBalls from './utils/moveBalls';

interface Size {
  width: number;
  height: number;
}

const canvasInitialWidth = 926;
const canvasInitialHeight = 600;
const PADDING = 40;

const initialCanvasSize = (): Size => {
  if (window.innerWidth > 1024) {
    return {
      width: canvasInitialWidth,
      height: canvasInitialHeight,
    };
  }

  return {
    width: window.innerWidth - PADDING * 2,
    height: canvasInitialHeight,
  };
};

const App = (): JSX.Element => {
  const [canvasSize, setCanvasSize] = useState<Size>(initialCanvasSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setCanvasSize({
          width: canvasInitialWidth,
          height: canvasInitialHeight,
        });
      } else {
        setCanvasSize({
          width: window.innerWidth - PADDING * 2,
          height: canvasInitialHeight,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setCanvasSize]);

  const [balls, setBalls] = useState<Ball[]>(
    initialBalls(canvasSize.width, canvasSize.height),
  );

  const contextRef = useRef<CanvasRenderingContext2D>();
  const canvasRef = useRef<HTMLCanvasElement>(null!);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')!;

    contextRef.current = context;

    animateBalls(balls, context, canvas);
  }, [balls]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    moveMouse(e, balls, setBalls);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const interval = setInterval(() => moveBalls(canvas, setBalls), 10);

    setBalls((prevBalls) => {
      return prevBalls.map((ball) => ({ ...ball }));
    });

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      className={`app flex w-full flex-col items-center justify-center gap-10 p-10`}
    >
      <h1 className={`text-5xl font-bold uppercase`}>BALLS</h1>
      <ul>
        <li>
          * To push a ball - hold the left mouse button and and touch the ball
        </li>
        <li>
          * To change the color of the ball - right click on the ball and pick a
          color
        </li>
      </ul>
      <canvas
        className={`canvas rounded-xl bg-neutral-content`}
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
    </main>
  );
};

export default App;
