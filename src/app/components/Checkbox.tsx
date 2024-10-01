import { appendClassName } from '@/utils/formatting';
import React, { type ComponentProps } from 'react';

const Checkbox = ({
  label,
  id,
  className,
  ...rest
}: { label: string } & ComponentProps<'input'>) => (
  <label htmlFor={id} className={`flex gap-4${appendClassName(className)}`}>
    <input className='checkbox' type='checkbox' id={id} {...rest} />
    {label}
  </label>
);

export default Checkbox;
