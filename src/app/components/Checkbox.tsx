import { appendClassName } from '@/utils/formatting';
import React from 'react';

interface CheckboxProps {
  label: string;
  id: string;
  className?: string;
  checked?: string;
  onChange?: () => void;
}

const Checkbox = ({
  label,
  id,
  className,
  checked,
  onChange,
}: CheckboxProps) => (
  <label
    htmlFor={id}
    className={`text-white text-opacity-60 flex gap-4${appendClassName(
      className
    )}`}
  >
    <input
      className='checkbox'
      type='checkbox'
      id={id}
      onChange={onChange}
      value={checked}
    />
    {label}
  </label>
);

export default Checkbox;
