import React, {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';
import Icon from './Icon';
import { appendClassName } from '@/utils/formatting';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  type?: string;
  placeholder?: string;
  clear?: boolean;
  onBlur?: () => void;
  autoFocus?: boolean;
  clearInput?: () => void;
  min?: number;
  inputMode?: any;
  icon?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder,
      onChange,
      onBlur,
      icon,
      autoFocus,
      value,
      clearInput,
      min,
      inputMode,
      label,
      className,
    },
    ref
  ) => {
    const [showClearButton, setShowClearButton] = useState(false);

    useEffect(() => {
      setShowClearButton(value !== '');
    }, [value]);

    return (
      <div
        className={`bg-night relative rounded-md border border-20 flex h-12 items-center px-4 transition-all duration-150 focus-within:border-opacity-60${appendClassName(
          className
        )}`}
      >
        {icon && <Icon name={icon} className='w-4 mr-3' />}
        {label && (
          <label className='absolute -top-2.5 px-1 bg-night text-sm font-medium text-lilac text-opacity-60'>
            {label}
          </label>
        )}
        <input
          ref={ref}
          value={value}
          type={type === 'currency' ? 'number' : type}
          placeholder={placeholder}
          min={type === 'currency' ? 0 : min}
          inputMode={type === 'currency' ? 'decimal' : inputMode}
          onBlur={() => {
            setShowClearButton(false);
            onBlur;
          }}
          onFocus={() => setShowClearButton(value !== '')}
          onChange={onChange}
          className='bg-transparent outline-none'
          autoFocus={autoFocus}
        />
        {showClearButton && (
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
