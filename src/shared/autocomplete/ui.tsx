import { CaretDownIcon, CaretUpIcon, CheckIcon } from "~shared/icons";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { ErrorAlert } from "~shared/error-alert";

interface AutocompleteProps {
  data: string[];
  label?: string;
  placeholder?: string;
  leftSection?: React.ReactNode;
  value?: string;
  error?: string | boolean;
  fieldName?: string;
  onChange?: (value: string) => void;
  handleBlur?: (fieldName: string) => void;
}

export function Autocomplete({
  data,
  label,
  placeholder,
  leftSection,
  onChange,
  error,
  handleBlur,
  fieldName,
  value,
}: AutocompleteProps) {
  const id = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const [selectedItem, setSelectedItem] = useState(value || "");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Функция которая обрабатывает клик вне компонента
   * 1. если у нас выбран уже какой то элемент и мы изменяем значение и потом закрываем, то вернется прошлое значение
   * 2. выйти можно только кликнув вне компонента
   */

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);

        if (selectedItem) {
          setSearchTerm(selectedItem);
        } else {
          setSearchTerm("");
          onChange?.("");
        }
      }
    },
    [selectedItem, onChange],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  /**
   * записывает значение города который приходим к нам из апи сразу в инпут
   */

  useEffect(() => {
    setSearchTerm(value || "");
    setSelectedItem(value || "");
  }, [value]);

  const handleItemClick = (item: string) => {
    setSearchTerm(item);
    setSelectedItem(item);
    setIsOpen(false);
    onChange?.(item);
  };

  const handleIconClick = () => {
    setIsOpen(true);
    inputRef.current?.focus();
  };

  /**
   * Поиск элемента через инпут
   */

  const filteredOptions = data.filter((item) =>
    item.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div>
      <label className="mb-3 block text-base" htmlFor={id}>
        {label}
      </label>
      <div
        ref={wrapperRef}
        className={`relative h-input rounded-md border bg-input  sm:w-input ${
          error && !isOpen ? "border-error" : "border-input"
        } `}
      >
        <div className=" absolute left-4 top-4 cursor-pointer" onClick={handleIconClick}>
          {leftSection}
        </div>
        <input
          ref={inputRef}
          autoComplete="off"
          className={`h-full w-full cursor-pointer truncate rounded-md bg-input px-6 py-3 focus:rounded-md focus:border-transparent focus:outline-none focus:ring-1 focus:ring-yellow-300 ${
            leftSection && "pl-12"
          }`}
          id={id}
          placeholder={placeholder}
          value={searchTerm}
          onBlur={() => handleBlur?.(fieldName!)}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={handleIconClick}
        />
        <div
          className="absolute bottom-0 right-6 top-0 flex cursor-pointer items-center"
          onClick={handleIconClick}
        >
          {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}
        </div>
        {isOpen && (
          <div className="absolute left-0 z-10 mt-4 max-h-36 w-full overflow-auto rounded-md border border-input bg-input shadow-xl scrollbar scrollbar-thumb-gray-600 scrollbar-thumb-rounded-md scrollbar-w-1 sm:w-input">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((item) => (
                <div
                  key={item}
                  className="flex w-full cursor-pointer justify-between rounded-md px-4 py-2 text-14 hover:bg-hover"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                  {selectedItem === item && <CheckIcon />}
                </div>
              ))
            ) : (
              <div className="flex justify-center rounded-md px-4 py-2 text-14">
                Ничего не найдено
              </div>
            )}
          </div>
        )}
      </div>
      {error && !isOpen && <ErrorAlert text={error} />}
    </div>
  );
}
