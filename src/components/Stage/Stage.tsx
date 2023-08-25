import { Layer, Text, Stage as KStage, Image, Line } from 'react-konva';
import s from './Stage.module.scss';
import { useRef, useState } from 'react';

// const URLImage = ({ image }) => {
//   const [img] = useImage(image.src);
//   return (
//     <Image
//       image={img}
//       x={image.x}
//       y={image.y}
//       // I will use offset to set origin to the center of the image
//       offsetX={img ? img.width / 2 : 0}
//       offsetY={img ? img.height / 2 : 0}
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

export const Stage = (props: StageProps) => {
  const { lineColor, lineWidth } = props;

  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const [tool, setTool] = useState('pen'); // на будущее // eraser
  const [lines, setLines] = useState<Stroke[]>([]);
  const isDrawing = useRef(false);

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

  return (
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
        {/* <Image
          text="Draggable Text"
          x={x}
          y={y}
          image={"https://konvajs.org/assets/lion.png"}
          draggable
          fill={isDragging ? 'green' : 'black'}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e) => {
            setX(e.target.x());
            setY(e.target.y());
            setIsDragging(false);
          }} 
        /> */}
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
  )
}