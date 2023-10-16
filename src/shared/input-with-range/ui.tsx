import { ErrorAlert } from "~shared/error-alert";
import { convertInputToNumber } from "~utils/convert-input-to-number";
import { useId } from "react";

interface InputWithRangeProps {
  label: string;
  placeholder: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  rightSection?: React.ReactNode;
  marks?: Array<string>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  hint?: React.ReactNode;
  error?: string;
}

export function InputWithRange({
  label,
  placeholder,
  value,
  onChange,
  min,
  max,
  rightSection,
  marks,
  onFocus,
  onBlur,
  hint,
  error,
}: InputWithRangeProps) {
  const id = useId();
  const formattedValue = value.toLocaleString("en-US");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(convertInputToNumber(event.target.value));
  };

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(convertInputToNumber(event.target.value));
  };

  /**
   * Меняет стиль инпута, чтобы левая часть прогресса была желтой, а другая серой
   */

  const progress = ((value - min) / (max - min)) * 100;
  const trackBackground = `linear-gradient(90deg, #FBE54D ${progress}%, #333535 ${progress}%)`;

  return (
    <>
      <div className="mb-3 flex items-center">
        <label className="block text-base text-white" htmlFor={id}>
          {label}
        </label>
        {hint && <div className="ml-1.5 cursor-pointer">{hint}</div>}
      </div>
      <div
        className={`ut relative rounded-md border bg-input sm:w-input ${
          error ? "border-error" : "border-input"
        }`}
      >
        <input
          className="h-full w-full rounded-md border-0 bg-input px-6 py-3 text-xl focus:outline-none"
          id={id}
          placeholder={placeholder}
          type="text"
          value={formattedValue}
          onBlur={onBlur}
          onChange={handleInputChange}
          onFocus={onFocus}
        />
        {rightSection && (
          <div className="absolute bottom-0 right-6 top-0 flex items-center">{rightSection}</div>
        )}
        <input
          className="rounded-md thumb sm:w-input"
          max={max}
          min={min}
          style={{ background: trackBackground }}
          type="range"
          value={value}
          onBlur={onBlur}
          onChange={handleRangeChange}
          onFocus={onFocus}
        />
      </div>
      {marks && (
        <div className="flex justify-between pt-2 text-sm sm:w-input">
          {marks.map((mark, index) => (
            <p key={index}>{mark}</p>
          ))}
        </div>
      )}
      {error && <ErrorAlert text={error} />}
    </>
  );
}
