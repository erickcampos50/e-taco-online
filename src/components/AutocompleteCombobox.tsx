// src/components/AutocompleteCombobox.tsx

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import ReactDOM from 'react-dom';
import type { Food } from '../types';
import { ChevronDown } from 'lucide-react'; // Importa a seta

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
  const [dropdownStyles, setDropdownStyles] = useState<React.CSSProperties>({});

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
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredOptions.length
      ) {
        handleOptionSelect(filteredOptions[highlightedIndex]);
      } else if (filteredOptions.length === 1) {
        handleOptionSelect(filteredOptions[0]);
      }
    }
  };

  // Função para alternar a lista de opções ao clicar na seta
  const toggleOptions = () => {
    setIsOpen((prev) => !prev);
    if (!isOpen) {
      setFilteredOptions(options);
    }
  };

  // Atualiza os estilos do dropdown quando o dropdown é aberto
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect();
      setDropdownStyles({
        position: 'absolute',
        top: inputRect.bottom + window.scrollY,
        left: inputRect.left + window.scrollX,
        width: inputRect.width,
        maxHeight: '60vh',
        overflowY: 'auto',
        zIndex: 1000,
      });
    }
  }, [isOpen]);

  return (
    <>
      <div className="relative w-full">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={displayValue}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(true)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="w-full p-2 pr-10 border rounded-md"
            placeholder="Selecione ou digite um alimento"
          />
          <button
            type="button"
            onClick={toggleOptions}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            aria-label="Toggle dropdown"
          >
            <ChevronDown
              size={20}
              className={`transform transition-transform duration-200 ${
                isOpen ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </button>
        </div>
      </div>
      {isOpen && filteredOptions.length > 0 && inputRef.current &&
        ReactDOM.createPortal(
          <ul
            style={dropdownStyles}
            className="bg-white border rounded-md shadow-lg"
          >
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
          </ul>,
          document.body
        )
      }
    </>
  );
};
