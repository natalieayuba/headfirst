import HyperLink from '@/app/components/Hyperlink';
import React from 'react';
import CheckoutSection from './CheckoutSection';
import NewCardForm from './NewCardForm';
import PaymentOption from './PaymentOption';
import Icon from '@/app/components/Icon';

const Payment = ({
  selectedPaymentOption,
  setSelectedPaymentOption,
}: {
  selectedPaymentOption: number;
  setSelectedPaymentOption: (index: number) => void;
}) => {
  // dosent scroll to top on phone

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

  return (
    <div className='flex flex-col gap-5'>
      <p className='secondary-text'>
        Signed in as{' '}
        <span className='text-white text-opacity-90'>John Doe</span>. Not you?{' '}
        <HyperLink href='/'>Sign out</HyperLink>
      </p>
      <CheckoutSection heading='Payment method'>
        {options.map(({ icon, title, subtitle, isDefault }, index) => (
          <>
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
            {index === selectedPaymentOption && selectedPaymentOption === 1 && (
              <NewCardForm />
            )}
          </>
        ))}
      </CheckoutSection>
    </div>
  );
};

export default Payment;
