import React, { RefObject, MouseEvent } from 'react';

interface CanvasSize {
  width: number;
  height: number;
}

interface CanvasProps {
  canvasRef: RefObject<HTMLCanvasElement>;
  handleMouseMove: (event: MouseEvent<HTMLCanvasElement>) => void;
  canvasSize: CanvasSize;
}

const Canvas: React.FC<CanvasProps> = ({
  canvasRef,
  handleMouseMove,
  canvasSize,
}) => {
  console.log('canvas');
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
