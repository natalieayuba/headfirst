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
      <div className='flex gap-2 my-3'>
        {[1, 3, 5].map((pound) => (
          <button
            key={pound}
            className={`relative border border-lilac border-opacity-20 rounded flex-1 px-3 py-2 transition-colors duration-100 ${
              selectedDonation === pound
                ? 'bg-lilac text-dark-night font-medium'
                : 'text-lilac hover:bg-lilac hover:bg-opacity-15'
            }`}
            onClick={() => handleClick(pound)}
          >
            {formatPrice(pound)}
            {selectedDonation === pound && (
              <Icon
                name='close'
                size='14'
                className='opacity-40 hover:opacity-60 absolute right-1.5 top-1/2 -translate-y-1/2'
              />
            )}
          </button>
        ))}
      </div>
      <Input
        id='custom-donation'
        type='currency'
        onChange={handleChange}
        clearInput={() => {
          setCustomDonation('');
          updateOrder('customDonation', 'Donation', 0);
        }}
        value={customDonation}
        label='Custom donation'
        className={`mt-2 ${
          customDonation === ''
            ? 'focus-within:before:content-["£"]'
            : 'before:content-["£"]'
        }`}
      />
    </CheckoutSection>
  );
};

export default Donate;
