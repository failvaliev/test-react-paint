import { Layer, Stage as KStage, Image as KImage, Line } from 'react-konva';
import s from './Stage.module.scss';
import { DragEvent, useCallback, useRef, useState } from 'react';
import { KonvaEventObject } from 'konva/lib/Node';

interface StageProps {
  lineWidth: number;
  lineColor: string;
  isDragging: boolean;
}

interface Stroke {
  t: string; // tool
  points: number[];
  c: string; // color
  w: number; // width
}

interface ImageData {
  tag: HTMLImageElement;
  x: number;
  y: number;
}

export const Stage = (props: StageProps) => {
  const { lineColor, lineWidth, isDragging } = props;

  const [tool, setTool] = useState('pen'); // на будущее // eraser
  const [lines, setLines] = useState<Stroke[]>([]);
  const isDrawing = useRef(false);

  const [images, setImages] = useState<ImageData[]>([]);

  const handleMouseDown = (e: any) => {
    if (isDragging) return;
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { t: tool, points: [pos.x, pos.y], c: lineColor, w: lineWidth }]);
  };

  const handleMouseMove = (e: any) => {
    if (isDragging) return;
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];

    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => defaultFn(e);

  const handleDrop = function (e: DragEvent<HTMLDivElement>) {
    defaultFn(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const url = URL.createObjectURL(e.dataTransfer.files[0]);
      let myImage = new Image();
      myImage.src = url;
      setImages(prev => prev.concat({ tag: myImage, x: 0, y: 0 }));
    }
  };

  const defaultFn = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragEnd = useCallback((image: ImageData) => (e: KonvaEventObject<globalThis.DragEvent>) => {
    if (!isDragging) return;

    setImages(s => s.map(im => {
      if (im.tag.src === image.tag.src) {
        return { ...im, x: e.target.x(), y: e.target.y() }
      }
      return im;
    }))
  }, [isDragging]);

  return (
    <div
      className={s.stageWrap}
      onDragEnter={handleDragEnter}
      onDragLeave={defaultFn}
      onDragOver={defaultFn}
      onDrop={handleDrop}
    >
      <KStage
        width={window.innerWidth}
        height={window.innerHeight}
        className={s.Stage}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {images.map(image => (
            <KImage
              key={image.tag.src}
              image={image.tag}
              x={image.x}
              y={image.y}
              offsetX={0}
              offsetY={0}
              draggable={isDragging}
              onDragEnd={handleDragEnd(image)}
            />
          ))}
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.c}
              strokeWidth={line.w}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.t === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          ))}
        </Layer>
      </KStage>
    </div>
  )
}