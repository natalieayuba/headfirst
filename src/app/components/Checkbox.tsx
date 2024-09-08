import { appendClassName } from '@/utils/formatting';
import React, { type ComponentProps } from 'react';

interface CheckboxProps {
  label: string;
  checked?: string;
}

const Checkbox = ({
  label,
  id,
  className,
  checked,
  onChange,
}: CheckboxProps & ComponentProps<'input'>) => (
  <label htmlFor={id} className={`flex gap-4${appendClassName(className)}`}>
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
