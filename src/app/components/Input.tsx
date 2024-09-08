import React, { forwardRef, useState, type ComponentProps } from 'react';
import Icon from './Icon';
import { appendClassName } from '@/utils/formatting';

interface InputProps {
  clearInput?: () => void;
  icon?: string;
  label?: string;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps & ComponentProps<'input'>
>(({ label, icon, clearInput, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className={`bg-night relative rounded-md border border-20 mt-2 flex h-12 items-center px-4 transition-all duration-150 focus-within:border-opacity-60 max-w-full${appendClassName(
        rest.className
      )}`}
    >
      {icon && <Icon name={icon} className='w-4 mr-3' />}
      {label && (
        <label
          htmlFor={rest.id}
          className={`absolute font-medium text-lilac text-opacity-60 transition-all duration-200 ${
            isFocused || rest.value !== ''
              ? '-translate-y-6 -translate-x-1 px-0.5 leading-none bg-night text-sm cursor-default'
              : 'cursor-text'
          }`}
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={rest.type === 'currency' ? 'number' : rest.type}
        min={rest.type === 'currency' ? 0 : rest.min}
        inputMode={rest.type === 'currency' ? 'decimal' : rest.inputMode}
        onBlur={() => {
          setIsFocused(false);
          rest.onBlur;
        }}
        onFocus={() => {
          setIsFocused(true);
          rest.onFocus;
        }}
        {...rest}
        className={`bg-transparent outline-none w-full flex-1 placeholder:transition-colors placeholder:duration-150${
          !isFocused ? ' placeholder-transparent' : ''
        }`}
      />
      {clearInput && isFocused && rest.value !== '' && (
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
});

Input.displayName = 'Input';

export default Input;
