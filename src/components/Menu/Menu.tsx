import s from './Menu.module.scss';

interface MenuProps {
  colorValue: string;
  lineWidthValue: number;
  setLineColor: (color: string) => void;
  setLineWidth: (value: number) => void;
}

export const Menu = (props: MenuProps) => {
  const { setLineColor, setLineWidth, colorValue, lineWidthValue } = props;
  return (
    <div className={s.Menu}>
      <label>Цвет кисти</label>
      <input
        type="color"
        value={colorValue}
        onChange={(e) => {
          setLineColor(e.target.value);
        }}
      />
      <label>Ширина кисти</label>
      <input
        type="range"
        min="3"
        max="20"
        value={lineWidthValue}
        onChange={(e) => {
          setLineWidth(+e.target.value);
        }}
      />
    </div>
  )
}