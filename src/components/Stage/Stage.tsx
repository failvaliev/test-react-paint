import { Layer, Text, Stage as KStage, Image as KImage, Line } from 'react-konva';
import s from './Stage.module.scss';
import { DragEvent, useCallback, useRef, useState } from 'react';
import useImage from 'use-image';

// interface URLImageProps {
//   x: number;
//   y: number;
//   image: HTMLImageElement;
// }

// const URLImage = (props: URLImageProps) => {
//   const { image, x, y } = props;

//   return (
//     <KImage
//       image={image}
//       x={x}
//       y={y}
//       offsetX={image ? image.width / 2 : 0}
//       offsetY={image ? image.height / 2 : 0}
//       draggable
//     />
//   );
// };

interface StageProps {
  lineWidth: number;
  lineColor: string;
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
  const { lineColor, lineWidth } = props;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [tool, setTool] = useState('pen'); // на будущее // eraser
  const [lines, setLines] = useState<Stroke[]>([]);
  const isDrawing = useRef(false);

  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const [imageElem, setImageElem] = useState<HTMLImageElement | null>(null);

  const handleMouseDown = (e: any) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    setLines([...lines, { t: tool, points: [pos.x, pos.y], c: lineColor, w: lineWidth }]);
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    // add point
    lastLine.points = lastLine.points.concat([point.x, point.y]);

    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };


  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    defaultFn(e);
  }

  const handleDrop = function (e: any) {
    defaultFn(e);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files);
      const url = URL.createObjectURL(e.dataTransfer.files[0]);
      console.log(url);
      let myImage = new Image();
      myImage.src = url;
      console.log(myImage);
      // setImageElem(myImage);
      setImages(prev => prev.concat(myImage));
    }
  };

  const defaultFn = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);


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
          {/* <Text
          text="Draggable Text"
          x={x}
          y={y}
          draggable
          fill={isDragging ? 'green' : 'black'}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e) => {
            setX(e.target.x());
            setY(e.target.y());
            setIsDragging(false);
          }}
        /> */}
          {/* {images.map(image => <URLImage image={image} x={200} y={200} key={image.src} />)} */}
          {images.map(image => (
            <KImage
              image={image}
              x={200}
              y={200}
              offsetX={image ? image.width / 2 : 0}
              offsetY={image ? image.height / 2 : 0}
              draggable
              onDragStart={() => setIsDragging(true)}
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