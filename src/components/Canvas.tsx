import { useState, useRef, useEffect } from 'react';
import { Ball } from '../types';
import initialBalls from '../utils/initialBalls';
import animateBalls from '../utils/animateBalls';
import moveMouse from '../utils/moveMouse';
import moveBalls from '../utils/moveBalls';

interface Size {
  width: number;
  height: number;
}

const BREAKPOINT = 768;
const PADDING = 20;
const CANVAS_INITIAL_WIDTH = BREAKPOINT - PADDING * 2;
const CANVAS_INITIAL_HEIGHT = Math.floor(CANVAS_INITIAL_WIDTH / 1.5);

const initialCanvasSize = (): Size => {
  if (window.innerWidth > BREAKPOINT) {
    return {
      width: CANVAS_INITIAL_WIDTH,
      height: CANVAS_INITIAL_HEIGHT,
    };
  }

  return {
    width: window.innerWidth - PADDING * 2,
    height: CANVAS_INITIAL_HEIGHT,
  };
};

const Canvas: React.FC = () => {
  const [canvasSize, setCanvasSize] = useState<Size>(initialCanvasSize);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > BREAKPOINT) {
        setCanvasSize({
          width: CANVAS_INITIAL_WIDTH,
          height: CANVAS_INITIAL_HEIGHT,
        });
      } else {
        setCanvasSize({
          width: window.innerWidth - PADDING * 2,
          height: CANVAS_INITIAL_HEIGHT,
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
    <canvas
      className={`canvas rounded-xl bg-neutral-content`}
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      width={canvasSize.width}
      height={canvasSize.height}
    ></canvas>
  );
};

export default Canvas;
