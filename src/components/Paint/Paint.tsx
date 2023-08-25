import { useState } from "react";
import s from './Paint.module.scss';
import { Menu } from '../Menu/Menu';
import { Stage } from "../Stage/Stage";

export const Paint = () => {
  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState("#000000");
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className={s.Paint}>
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