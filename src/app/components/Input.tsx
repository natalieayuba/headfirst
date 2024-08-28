import React, {
  forwardRef,
  useEffect,
  useState,
  type ChangeEvent,
} from 'react';
import Icon from './Icon';

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  clear?: boolean;
  onBlur?: () => void;
  autoFocus?: boolean;
  clearInput?: () => void;
  min?: number;
  inputMode?: any;
  icon?: string;
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
    },
    ref
  ) => {
    const [showClearButton, setShowClearButton] = useState(false);

    useEffect(() => {
      setShowClearButton(value !== '');
    }, [value]);

    return (
      <div className='bg-night rounded-md border border-20 flex h-12 items-center px-4'>
        {icon && <Icon name={icon} className='w-4 mr-3' />}
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
            className='pl-3 text-white-alpha-60 hover:opacity-85 ml-auto'
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
