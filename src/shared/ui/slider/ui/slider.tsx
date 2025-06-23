interface SingleSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
}

export function Slider({ min = 0, max = 100, step = 1, value, onChange }: SingleSliderProps) {
  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="h-6 w-full">
      <div className="bg-muted pointer-events-none h-2 w-full overflow-hidden rounded-full">
        <div className="bg-united-nations-blue h-full" style={{ width: `${percent}%` }} />
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className={`[&::-webkit-slider-thumb]:bg-united-nations-blue [&::-moz-range-thumb]:bg-united-nations-blue [&::-webkit-slider-thumb]:outline-muted -mt-4 block h-6 w-full appearance-none bg-transparent [&::-moz-range-thumb]:size-4 [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-webkit-slider-thumb]:size-4 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:outline-2`}
      />
    </div>
  );
}
