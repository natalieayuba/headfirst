import React, { useEffect, useState, type ChangeEvent } from 'react';
import CheckoutSection from './CheckoutSection';
import { formatPrice } from '@/utils/formatting';
import Input from '@/app/components/Input';

const Donate = ({
  donation,
  setDonation,
}: {
  donation: number;
  setDonation: (pound: number) => void;
}) => {
  const [selectedDonation, setSelectedDonation] = useState(0);
  const [customDonation, setCustomDonation] = useState('');

  const handleClick = (pound: number) => {
    setSelectedDonation(pound === selectedDonation ? 0 : pound);
    setDonation(pound === selectedDonation ? 0 : pound);
  };

  const handleChange = (e: ChangeEvent) => {
    const value = (e.target as HTMLInputElement).value;
    setSelectedDonation(0);
    setCustomDonation(value);
    setDonation(Number(value));
  };

  const clearInput = () => {
    setCustomDonation('');
    setDonation(0);
  };

  return (
    <CheckoutSection heading='Donate'>
      <p className='text-white text-opacity-60 my-1'>
        Your donation will help PRSC continue their programme of homeless
        support, community arts & activism.
      </p>
      <div className='flex gap-2'>
        {[1, 3, 5].map((pound) => (
          <button
            key={pound}
            className={`border font-medium border-lilac rounded flex-1 px-3 py-1.5 ${
              selectedDonation === pound
                ? 'bg-lilac text-dark-night'
                : 'text-lilac'
            }`}
            onClick={() => handleClick(pound)}
          >
            {formatPrice(pound)}
          </button>
        ))}
      </div>
      <Input
        type='currency'
        icon='pound'
        onChange={handleChange}
        value={customDonation}
        clearInput={clearInput}
        label='Custom donation'
        className='mt-2'
      />
    </CheckoutSection>
  );
};

export default Donate;
