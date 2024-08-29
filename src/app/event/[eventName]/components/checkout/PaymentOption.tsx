import React, { type ChangeEvent } from 'react';

const PaymentOption = ({
  index,
  icon,
  title,
  subtitle,
  isDefault,
  handleChange,
}: {
  index: number;
  icon: JSX.Element;
  title: string;
  subtitle?: string;
  isDefault?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>, index: number) => void;
}) => (
  <label
    className='flex gap-4 py-3 items-center list-divider'
    htmlFor={title.toLowerCase().replace(' ', '-')}
  >
    <input
      type='radio'
      id={title.toLowerCase().replace(' ', '-')}
      name='payment'
      className='radio-button'
      onChange={(e) => handleChange(e, index)}
    />
    {icon}
    <div>
      <p>{title}</p>
      <p className='secondary-text leading-tight'>{subtitle}</p>
    </div>
    {isDefault && <p className='ml-auto secondary-text'>Default</p>}
  </label>
);

export default PaymentOption;
