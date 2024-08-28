import React, { useState } from 'react';
import CheckoutSection from './CheckoutSection';
import { formatPrice } from '@/utils/formatting';

const Donate = ({ setDonation }: { setDonation: (pound: number) => void }) => {
  const [selected, setSelected] = useState(-1);

  const handleClick = (pound: number, index: number) => {
    setDonation(selected === index ? 0 : pound);
    setSelected(selected === index ? -1 : index);
  };

  return (
    <CheckoutSection heading='Donate'>
      <p className='text-white-alpha-60 my-1'>
        Your donation will help PRSC continue their programme of homeless
        support, community arts & activism.
      </p>
      <div className='flex gap-2'>
        {[1, 3, 5].map((pound, index) => (
          <button
            className={`border font-medium border-lilac rounded flex-1 px-3 py-1.5 ${
              selected === index ? 'bg-lilac text-dark-night' : 'text-lilac'
            }`}
            onClick={() => handleClick(pound, index)}
          >
            {formatPrice(pound)}
          </button>
        ))}
      </div>
    </CheckoutSection>
  );
};

export default Donate;
