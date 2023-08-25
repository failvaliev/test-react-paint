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
  return (
    <div className={s.Menu}>
      <label htmlFor="drug-checkbox">Drug</label>
      <input
        type="checkbox"
        name="drug checkbox"
        id="drug-checkbox" onChange={e => setDrug(e.target.checked)}
        checked={drugValue}
      />
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