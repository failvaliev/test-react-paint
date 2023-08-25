import { ChangeEvent, useCallback } from 'react';
import s from './Menu.module.scss';

interface MenuProps {
  colorValue: string;
  lineWidthValue: number;
  drugValue: boolean;
  setLineColor: (color: string) => void;
  setLineWidth: (value: number) => void;
  setDrug: (value: boolean) => void;
}

export const Menu = (props: MenuProps) => {
  const { setLineColor, setLineWidth, setDrug, drugValue, colorValue, lineWidthValue } = props;

  const handleDrugChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setDrug(e.target.checked), [setDrug]);
  const handleColorChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setLineColor(e.target.value), [setLineColor]);
  const handleWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setLineWidth(+e.target.value), [setLineWidth]);

  return (
    <div className={s.Menu}>
      <label htmlFor="drug-checkbox">Drug</label>
      <input
        type="checkbox"
        name="drug checkbox"
        id="drug-checkbox"
        onChange={handleDrugChange}
        checked={drugValue}
      />
      <label>Цвет кисти</label>
      <input
        type="color"
        value={colorValue}
        onChange={handleColorChange}
      />
      <label>Ширина кисти</label>
      <input
        type="range"
        min="3"
        max="20"
        value={lineWidthValue}
        onChange={handleWidthChange}
      />
    </div>
  )
}