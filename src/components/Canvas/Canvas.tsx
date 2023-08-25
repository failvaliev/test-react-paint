import { DragEvent, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import s from './Canvas.module.scss';
import { Menu } from '../Menu/Menu';
import { Stage } from "../Stage/Stage";

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

  // let dragTarget: any = null;
  const boxes = [
    { x: 200, y: 220, w: 100, h: 50 },
  ];
  // let startX = 0;
  // let startY = 0;
  // let isDown = false;

  // const hitBox = (x: number, y: number) => {
  //   let isTarget = null;
  //   for (let i = 0; i < boxes.length; i++) {
  //     const box = boxes[i];
  //     if (x >= box.x && x <= box.x + box.w && y >= box.y && y <= box.y + box.h) {
  //       dragTarget = box;
  //       isTarget = true;
  //       break;
  //     }
  //   }
  //   return isTarget;
  // }

  // const drawBoxes = () => {
  //   // @ts-ignore
  //   ctxRef.current.clearRect(0, 0, canvasRef.current.clientWidth, canvasRef.current.clientHeight);
  //   boxes.map(info => drawFillRect(info));
  // }

  // const drawFillRect = (info: any) => {
  //   const { x, y, w, h } = info;

  //   if (ctxRef.current) {
  //     ctxRef.current.beginPath();
  //     ctxRef.current.fillStyle = 'black';
  //     ctxRef.current.fillRect(x, y, w, h);
  //   }
  // }

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
    // if (canvasRef.current) {
    //   startX = e.nativeEvent.offsetX - canvasRef.current.clientLeft;
    //   startY = e.nativeEvent.offsetY - canvasRef.current.clientTop;
    //   isDown = hitBox(startX, startY) || false;
    // }
  };

  const onMouseUp = () => {
    if (ctxRef.current) {
      ctxRef.current.closePath();
      setIsDrawing(false);
    }
    // dragTarget = null;
    // isDown = false;
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

      // if (!isDown) return;

      // const mouseX = e.nativeEvent.offsetX - canvasRef.current.clientLeft;
      // const mouseY = e.nativeEvent.offsetY - canvasRef.current.clientTop;
      // const dx = mouseX - startX;
      // const dy = mouseY - startY;
      // startX = mouseX;
      // startY = mouseY;
      // dragTarget.x += dx;
      // dragTarget.y += dy;
      // drawBoxes();
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
      <Stage
        lineColor={lineColor}
        lineWidth={lineWidth}
        isDragging={isDragging}
      />
    </div>
  )
}