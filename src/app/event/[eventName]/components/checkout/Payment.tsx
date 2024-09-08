import HyperLink from '@/app/components/Hyperlink';
import React, { useEffect, useState } from 'react';
import CheckoutSection from './CheckoutSection';
import NewCardForm from './NewCardForm';
import PaymentOption from './PaymentOption';
import Icon from '@/app/components/Icon';

interface PaymentProps {
  disableButton: (disabled: boolean) => void;
}

const Payment = ({ disableButton }: PaymentProps) => {
  const cardDetailsDefault = {
    name: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
    postcode: '',
    save: false,
    default: false,
  };
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(-1);
  const [newCardDetails, setNewCardDetails] = useState(cardDetailsDefault);

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
    disableButton(
      selectedPaymentOption === -1 ||
        (selectedPaymentOption === 1 &&
          Object.values(newCardDetails).some((value) => value === ''))
    );
  }, [disableButton, newCardDetails, selectedPaymentOption]);

  useEffect(() => {
    if (selectedPaymentOption !== 1) {
      setNewCardDetails(cardDetailsDefault);
    }
  }, [selectedPaymentOption, setNewCardDetails]);

  return (
    <div className='flex-1'>
      <p className='secondary-text mt-6'>
        Signed in as{' '}
        <span className='text-white text-opacity-90'>John Doe</span>. Not you?{' '}
        <HyperLink href='/'>Sign out</HyperLink>
      </p>
      <CheckoutSection heading='Payment method' className='[&&]:mt-4'>
        <ul>
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
