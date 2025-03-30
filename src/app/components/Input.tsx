import React, { forwardRef, type ComponentProps } from 'react';
import Icon from './Icon';
import { appendClassName } from '@/utils/formatting';

interface InputProps {
  icon?: string;
  label?: string;
  className?: string;
  clearInput: () => void;
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps & ComponentProps<'input'>
>(({ label, icon, clearInput, className, ...rest }, ref) => (
  <div
    className={`bg-night relative rounded-md border border-20 mt-2 flex h-12 items-center px-4 transition-all duration-150 focus-within:border-opacity-60 max-w-full${appendClassName(
      className
    )}`}
  >
    {icon && <Icon name={icon} className='w-4 mr-3' />}
    <input
      ref={ref}
      className='bg-transparent outline-none w-full flex-1 placeholder:transition-colors placeholder:duration-150 [&:not(:focus)]:placeholder-transparent peer'
      {...rest}
    />
    {label && (
      <label
        htmlFor={rest.id}
        className='absolute -top-2 left-3 font-medium text-lilac text-opacity-60 transition-all duration-200 px-0.5 leading-none bg-night text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-placeholder-shown:cursor-text peer-focus:-top-2 peer-focus:left-3 peer-focus:cursor-default'
      >
        {label}
      </label>
    )}
    <button
      type='button'
      onClick={clearInput}
      onMouseDown={(e) => e.preventDefault()}
      title='Clear'
      className='pl-3 text-white text-opacity-60 hover:opacity-85 ml-auto hidden peer-[&:not(:placeholder-shown)]:block'
    >
      <Icon name='close' size={16} />
    </button>
  </div>
));

Input.displayName = 'Input';

export default Input;
