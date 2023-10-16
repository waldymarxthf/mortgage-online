import { ErrorAlert } from "~shared/error-alert";
import { convertInputToNumber } from "~utils/convert-input-to-number";
import { useId } from "react";

interface TextFieldProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  max?: number;
  min?: number;
  placeholder?: string;
  rightSection?: React.ReactNode;
  error?: string;
}

export function TextField({
  value,
  onChange,
  label,
  max,
  min,
  placeholder,
  rightSection,
  error,
}: TextFieldProps) {
  const id = useId();
  const formattedValue = value.toLocaleString("en-US");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(convertInputToNumber(event.target.value));
  };

  return (
    <div>
      <label className="mb-3 block text-base text-white" htmlFor={id}>
        {label}
      </label>
      <div
        className={`relative h-input rounded-md border bg-input  sm:w-input ${
          error ? "border-error" : "border-input"
        }`}
      >
        <input
          className="h-full w-full rounded-md bg-input px-6 py-3 text-xl focus:outline-none"
          id={id}
          max={max}
          min={min}
          placeholder={placeholder}
          type="text"
          value={formattedValue}
          onChange={handleChange}
        />
        <div className="absolute bottom-0 right-6 top-0 ml-3 flex items-center">{rightSection}</div>
      </div>
      {error && <ErrorAlert text={error} />}
    </div>
  );
}
