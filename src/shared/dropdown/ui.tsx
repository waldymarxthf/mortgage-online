import { CaretDownIcon, CaretUpIcon, CheckIcon } from "~shared/icons";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ErrorAlert } from "~shared/error-alert";

interface DropdownProps {
  data: string[];
  label: string;
  placeholder: string;
  fieldName?: string;
  value?: string;
  error?: string | boolean;
  onChange?: (value: string) => void;
  handleBlur?: (fieldName: string) => void;
}

export function Dropdown({
  data,
  label,
  placeholder,
  onChange,
  value,
  error,
  handleBlur,
  fieldName,
}: DropdownProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /**
   * Функция которая обрабатывает клик вне компонента
   * 1. закрывает dropdown если кликнули вне компонента
   */

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
    <>
      <label className="mb-3 block text-base sm:w-input" htmlFor={id}>
        {label}
      </label>
      <div
        ref={wrapperRef}
        className={`relative h-input rounded-md border bg-input sm:w-input ${
          error && !isOpen ? "border-error" : "border-input"
        }`}
      >
        <input
          readOnly
          className="h-full w-full cursor-pointer truncate rounded-md bg-input px-6 py-3 pr-20 focus:rounded-md focus:border-transparent focus:outline-none focus:ring-1 focus:ring-yellow-300"
          id={id}
          placeholder={placeholder}
          value={value}
          onBlur={() => handleBlur?.(fieldName!)}
          onClick={() => setIsOpen(true)}
        />
        <div className="absolute bottom-0 right-6 top-0 flex items-center">
          {isOpen ? (
            <CaretUpIcon className="cursor-pointer" />
          ) : (
            <CaretDownIcon className="cursor-pointer" onClick={() => setIsOpen(true)} />
          )}
        </div>
        {isOpen && (
          <div className="absolute left-0 z-10 mt-4 max-h-40 w-full overflow-auto rounded-md border border-input bg-input opacity-100 shadow-xl transition-opacity duration-300 ease-in-out scrollbar scrollbar-thumb-gray-600 scrollbar-thumb-rounded-md scrollbar-w-1 sm:w-input">
            {data.map((item) => (
              <div
                key={item}
                className="flex w-full cursor-pointer justify-between rounded-md px-4 py-2 text-14 hover:bg-hover"
                onClick={() => {
                  onChange?.(item);
                  setIsOpen(false);
                }}
              >
                {item}
                {value === item && <CheckIcon />}
              </div>
            ))}
          </div>
        )}
      </div>
      {error && !isOpen && <ErrorAlert text={error} />}
    </>
  );
}
