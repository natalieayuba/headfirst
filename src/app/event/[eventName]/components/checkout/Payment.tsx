import HyperLink from '@/app/components/Hyperlink';
import React, { useEffect } from 'react';
import CheckoutSection from './CheckoutSection';
import NewCardForm from './NewCardForm';
import PaymentOption from './PaymentOption';
import Icon from '@/app/components/Icon';
import { cardDetailsDefault, type NewCardDetails } from './CheckoutLightbox';

const Payment = ({
  selectedPaymentOption,
  setSelectedPaymentOption,
  newCardDetails,
  setNewCardDetails,
}: {
  selectedPaymentOption: number;
  setSelectedPaymentOption: (index: number) => void;
  newCardDetails: NewCardDetails;
  setNewCardDetails: (details: NewCardDetails) => void;
}) => {
  const options = [
    {
      title: 'Card ending in 6159',
      icon: <Icon name='visa' fill='white' />,
      subtitle: '07/2025',
      isDefault: true,
    },
    {
      title: 'Pay with new card',
      icon: <Icon name='card' />,
    },
  ];

  useEffect(() => {
    if (selectedPaymentOption !== 1) {
      setNewCardDetails(cardDetailsDefault);
    }
  }, [selectedPaymentOption]);

  return (
    <div className='flex flex-col gap-5'>
      <p className='secondary-text'>
        Signed in as{' '}
        <span className='text-white text-opacity-90'>John Doe</span>. Not you?{' '}
        <HyperLink href='/'>Sign out</HyperLink>
      </p>
      <CheckoutSection heading='Payment method'>
        <ul className='min-w-[340px]'>
          {options.map(({ icon, title, subtitle, isDefault }, index) => (
            <li key={title} className='list-divider'>
              <PaymentOption
                index={index}
                icon={icon}
                title={title}
                subtitle={subtitle}
                isDefault={isDefault}
                handleChange={(e) => {
                  if (e.target.value === 'on') setSelectedPaymentOption(index);
                }}
              />
              {index === selectedPaymentOption &&
                selectedPaymentOption === 1 && (
                  <NewCardForm
                    newCardDetails={newCardDetails}
                    setNewCardDetails={setNewCardDetails}
                  />
                )}
            </li>
          ))}
        </ul>
      </CheckoutSection>
    </div>
  );
};

export default Payment;
