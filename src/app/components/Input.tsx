import React, {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from 'react';
import Icon from './Icon';
import { appendClassName } from '@/utils/formatting';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label?: string;
  type: string;
  placeholder?: string;
  clear?: boolean;
  onBlur?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  onKeyUp?: (e: KeyboardEvent) => void;
  onFocus?: () => void;
  autoFocus?: boolean;
  clearInput?: () => void;
  pattern?: string;
  min?: number;
  inputMode?: any;
  icon?: string;
  className?: string;
  maxLength?: number;
  autoCorrect?: string;
  spellCheck?: boolean;
  autoComplete?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      id,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      icon,
      autoFocus,
      value,
      clearInput,
      pattern,
      min,
      inputMode,
      label,
      className,
      maxLength,
      onKeyDown,
      onKeyUp,
      autoCorrect,
      spellCheck,
      autoComplete,
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div
        className={`bg-night relative rounded-md border border-20 flex h-12 items-center px-4 transition-all duration-150 focus-within:border-opacity-60 max-w-full${appendClassName(
          className
        )}`}
      >
        {icon && <Icon name={icon} className='w-4 mr-3' />}
        {label && (
          <label
            htmlFor={id}
            className={`absolute font-medium text-lilac text-opacity-60 transition-all duration-200${
              isFocused || value !== ''
                ? ' -translate-y-6 -translate-x-1 px-0.5 bg-night text-sm'
                : ''
            }`}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          value={value}
          type={type === 'currency' ? 'number' : type}
          placeholder={placeholder}
          min={type === 'currency' ? 0 : min}
          pattern={pattern}
          inputMode={type === 'currency' ? 'decimal' : inputMode}
          maxLength={maxLength}
          onBlur={() => {
            setIsFocused(false);
            onBlur;
          }}
          onFocus={() => {
            setIsFocused(true);
            onFocus;
          }}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onChange={onChange}
          autoCorrect={autoCorrect}
          spellCheck={spellCheck}
          autoComplete={autoComplete}
          className={`bg-transparent outline-none w-full flex-1 placeholder:transition-colors placeholder:duration-150${
            !isFocused ? ' placeholder-transparent' : ''
          }`}
          autoFocus={autoFocus}
        />
        {clearInput && isFocused && value !== '' && (
          <button
            onClick={clearInput}
            onMouseDown={(e) => e.preventDefault()}
            className='pl-3 text-white text-opacity-60 hover:opacity-85 ml-auto'
          >
            <Icon name='close' size={16} />
          </button>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
