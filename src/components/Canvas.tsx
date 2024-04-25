import { useState, useRef, useEffect, useCallback } from 'react';
import { TwitterPicker } from 'react-color';
import { Ball } from '../types';
import initialBalls from '../utils/initialBalls';
import animateBalls from '../utils/animateBalls';
import moveMouse from '../utils/moveMouse';
import moveBalls from '../utils/moveBalls';
import updateBallColor from '../utils/updateBallColor';

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
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [selectedBall, setSelectedBall] = useState<Ball | null>(null);
  const [color, setColor] = useState('#000000');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 });

  const colorInputRef = useRef<HTMLInputElement>(null!);

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
    if (isMouseDown) {
      moveMouse(e, balls, setBalls);
    }
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (e.button === 0) {
        setIsMouseDown(true);
        setShowColorPicker(false);
      } else if (e.button === 2) {
        e.preventDefault();
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const clickedBall = balls.find((ball) => {
          const distance = Math.sqrt((ball.x - x) ** 2 + (ball.y - y) ** 2);
          return distance <= ball.radius;
        });
        if (clickedBall) {
          setSelectedBall(clickedBall);
          setShowColorPicker(true);
          setPickerPosition({
            x: clickedBall.x + clickedBall.radius + 5 + rect.left, // Adjust the x-coordinate
            y: clickedBall.y + rect.top, // Adjust the y-coordinate
          });
        }
      }
    },
    [balls],
  );

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleColorChange = (color: any) => {
    setColor(color.hex);
    setBalls(
      updateBallColor(balls, selectedBall, color.hex) as React.SetStateAction<
        Ball[]
      >,
    );
    setShowColorPicker(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const interval = setInterval(() => moveBalls(canvas, setBalls), 10);

    setBalls((prevBalls) => {
      return prevBalls.map((ball) => ({ ...ball }));
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsMouseDown(false);
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);

    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  useEffect(() => {
    const handleGlobalMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsMouseDown(true);
      }
    };

    window.addEventListener('mousedown', handleGlobalMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleGlobalMouseDown);
    };
  }, []);

  return (
    <>
      <canvas
        className={`canvas rounded-xl bg-neutral-content`}
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => e.preventDefault()}
        width={canvasSize.width}
        height={canvasSize.height}
      ></canvas>
      {showColorPicker && selectedBall && (
        <div
          style={{
            position: 'absolute',
            left: `${pickerPosition.x}px`,
            top: `${pickerPosition.y}px`,
          }}
        >
          {' '}
          <TwitterPicker
            color={color}
            onChangeComplete={handleColorChange}
            triangle="hide"
          />
        </div>
      )}
    </>
  );
};

export default Canvas;
