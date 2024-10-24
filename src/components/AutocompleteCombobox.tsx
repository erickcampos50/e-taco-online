// src/components/AutocompleteCombobox.tsx

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import type { Food } from '../types';

interface AutocompleteComboboxProps {
  options: Food[];
  value: number;
  onChange: (value: number) => void;
}

export const AutocompleteCombobox: React.FC<AutocompleteComboboxProps> = ({
  options,
  value,
  onChange,
}) => {
  const [displayValue, setDisplayValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<Food[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const selectedOption = options.find((option) => option.id === value);
    setDisplayValue(selectedOption ? selectedOption.description : '');
  }, [value, options]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);

    if (inputValue.length > 0) {
      const filtered = options.filter((option) =>
        option.description.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredOptions(filtered);
      setIsOpen(true);
    } else {
      setFilteredOptions(options);
      setIsOpen(true);
    }
    setHighlightedIndex(-1);
  };

  const handleOptionSelect = (option: Food) => {
    setDisplayValue(option.description);
    onChange(option.id);
    setIsOpen(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < filteredOptions.length) {
        handleOptionSelect(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length === 1) {
        handleOptionSelect(filteredOptions[0]);
      }
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="w-full p-2 border rounded-md"
        placeholder="Selecione ou digite um alimento"
      />
      {isOpen && filteredOptions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded-md max-h-60 overflow-y-auto">
          {filteredOptions.map((option, index) => (
            <li
              key={option.id}
              onClick={() => handleOptionSelect(option)}
              className={`p-2 cursor-pointer ${
                index === highlightedIndex ? 'bg-gray-200' : 'hover:bg-gray-100'
              }`}
            >
              {option.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
