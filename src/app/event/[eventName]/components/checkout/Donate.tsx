import React, { useState, type ChangeEvent } from 'react';
import CheckoutSection from './CheckoutSection';
import { formatPrice } from '@/utils/formatting';
import Input from '@/app/components/Input';
import Icon from '@/app/components/Icon';
import type { GetTicketsProps } from './GetTickets';

const Donate = ({ updateOrder, orderSummary }: GetTicketsProps) => {
  const [selectedDonation, setSelectedDonation] = useState(
    orderSummary.find(({ type }) => type === 'selectedDonation')?.price ?? 0
  );
  const [customDonation, setCustomDonation] = useState(
    orderSummary.some(({ type }) => type === 'customDonation')
      ? String(
          orderSummary.find(({ type }) => type === 'customDonation')?.price
        )
      : ''
  );

  const handleClick = (pound: number) => {
    console.log('focus');
    const value = pound === selectedDonation ? 0 : pound;
    setSelectedDonation(value);
    setCustomDonation('');
    updateOrder('selectedDonation', 'Donation', value);
  };

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSelectedDonation(0);
    setCustomDonation(value);
    updateOrder('customDonation', 'Donation', Number(value));
  };

  return (
    <CheckoutSection heading='Donate'>
      <p className='text-white text-opacity-60 my-1'>
        Your donation will help PRSC continue their programme of homeless
        support, community arts & activism.
      </p>
      <fieldset>
        <legend className='hidden'>Select a donation</legend>
        <ul className='flex gap-2 my-3'>
          {[1, 3, 5].map((pound) => (
            <li key={pound} className='flex-1'>
              <label
                htmlFor={`donation-${pound}`}
                className='relative flex cursor-pointer justify-center items-center border border-lilac border-opacity-20 rounded px-3 w-full py-2 transition-colors duration-50 text-lilac hover:bg-lilac has-[:checked]:bg-lilac has-[:checked]:text-dark-night has-[:checked]:font-medium has-[:checked]:bg-opacity-100 hover:bg-opacity-15'
              >
                <input
                  aria-label={`£${pound} donation`}
                  type='checkbox'
                  id={`donation-${pound}`}
                  name='selected-donation'
                  className='appearance-none w-0 peer'
                  onClick={() => handleClick(pound)}
                  checked={selectedDonation === pound}
                />
                {formatPrice(pound)}
                <Icon
                  name='close'
                  size={14}
                  className='opacity-40 hover:opacity-60 absolute right-2 hidden peer-checked:block'
                />
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <Input
        id='custom-donation'
        type='number'
        inputMode='decimal'
        step='0.01'
        min={0.01}
        placeholder='00.00'
        onChange={handleChange}
        clearInput={() => {
          setCustomDonation('');
          updateOrder('customDonation', 'Donation', 0);
        }}
        value={customDonation}
        label='Custom donation'
        className='mt-2 before:content-["£"]'
      />
    </CheckoutSection>
  );
};

export default Donate;
