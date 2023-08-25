import { MouseEvent, useEffect, useRef, useState } from "react";
import s from './Canvas.module.scss';
import { Menu } from '../Menu/Menu';

interface CanvasProps {
  className?: string;
}

// нативный canvas с рисованием, без картинок
export const Canvas = ({ className }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
      }
    }
  }, [lineColor, lineWidth]);

  const onMouseDown = (e: MouseEvent<HTMLCanvasElement>) => {
    if (ctxRef.current) {
      ctxRef.current.beginPath();
      ctxRef.current.moveTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );
      setIsDrawing(true);
    }
  };

  const onMouseUp = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath();
      setIsDrawing(false);
    }
  };

  const onMouseMove = (e: MouseEvent<HTMLCanvasElement>) => {
    if (ctxRef.current && canvasRef.current) {
      if (!isDrawing) {
        return;
      }
      ctxRef.current.lineTo(
        e.nativeEvent.offsetX,
        e.nativeEvent.offsetY
      );

      ctxRef.current.stroke();
    }
  };
  const handleMouseOut = () => {
    onMouseUp();
  }

  return (
    <div className={s.Canvas}>
      <canvas
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onMouseOut={handleMouseOut}
        ref={canvasRef}
        className={className}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <Menu
        colorValue={lineColor}
        lineWidthValue={lineWidth}
        drugValue={isDragging}
        setLineColor={setLineColor}
        setLineWidth={setLineWidth}
        setDrug={setIsDragging}
      />
    </div>
  )
}