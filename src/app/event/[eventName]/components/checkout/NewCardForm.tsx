import Input from '@/app/components/Input';
import React, { useState, type ChangeEvent, type KeyboardEvent } from 'react';
import type { NewCardDetails } from './CheckoutLightbox';
import Checkbox from '@/app/components/Checkbox';

const NewCardForm = ({
  newCardDetails,
  setNewCardDetails,
}: {
  newCardDetails: NewCardDetails;
  setNewCardDetails: (details: NewCardDetails) => void;
}) => {
  const [saveCardChecked, setSaveCardChecked] = useState(false);

  const handleClear = (key: string) =>
    setNewCardDetails({ ...newCardDetails, [key]: '' });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, key: string) =>
    setNewCardDetails({ ...newCardDetails, [key]: e.target.value });

  const validateCardNumber = (e: KeyboardEvent) => {
    let target = e.target as HTMLInputElement;
    const digitsLength = target.value.replace(/\D/g, '').length;

    if (e.key !== 'Backspace') {
      if (/\D/g.test(e.key) || digitsLength === 16) {
        e.preventDefault();
      } else if (digitsLength % 4 === 0) {
        target.value += ' ';
      }
    }
  };

  const validateExpiryDate = (e: KeyboardEvent) => {
    let target = e.target as HTMLInputElement;
    if (e.key !== 'Backspace') {
      if (/\D/g.test(e.key)) {
        e.preventDefault();
      } else if (target.value.length === 2) {
        target.value += '/';
      }
    }
  };

  return (
    <div className='flex flex-col gap-4 ml-7 py-1'>
      <Input
        type='text'
        label='Name on card'
        placeholder='John Doe'
        id='name'
        value={newCardDetails.name}
        clearInput={() => handleClear('name')}
        onChange={(e) => handleChange(e, 'name')}
        autoComplete='cc-name'
        autoCorrect='off'
        spellCheck={false}
      />
      <Input
        type='text'
        label='Card number'
        id='card-number'
        placeholder='1234 1234 1234 1234'
        inputMode='numeric'
        value={newCardDetails.cardNumber}
        clearInput={() => handleClear('cardNumber')}
        onChange={(e) => handleChange(e, 'cardNumber')}
        onKeyDown={validateCardNumber}
        autoCorrect='off'
        spellCheck={false}
        autoComplete='cc-number'
      />
      <div className='flex'>
        <Input
          type='text'
          label='Expiry date'
          placeholder='MM/YY'
          id='expiry-date'
          inputMode='numeric'
          value={newCardDetails.expiryDate}
          onChange={(e) => handleChange(e, 'expiryDate')}
          onKeyUp={validateExpiryDate}
          className='w-1/2 rounded-r-none'
          maxLength={5}
          autoComplete='cc-exp'
          autoCorrect='off'
          spellCheck={false}
        />
        <Input
          type='text'
          label='Security code'
          placeholder='CVC'
          id='security-code'
          inputMode='numeric'
          value={newCardDetails.securityCode}
          onChange={(e) => handleChange(e, 'securityCode')}
          className='w-1/2 rounded-l-none'
          maxLength={3}
          autoComplete='cc-csc'
          autoCorrect='off'
          spellCheck={false}
        />
      </div>
      <Input
        type='text'
        label='Postcode'
        placeholder='AB12 CD3'
        id='postcode'
        value={newCardDetails.postcode}
        onChange={(e) => handleChange(e, 'postcode')}
        maxLength={9}
        autoComplete='postal-code'
        autoCorrect='off'
        spellCheck={false}
      />
      <div className='flex flex-col gap-1'>
        <Checkbox
          label='Save card for future purchases'
          id='save-card'
          checked={String(saveCardChecked)}
          onChange={() => setSaveCardChecked(!saveCardChecked)}
        />
        {saveCardChecked && (
          <Checkbox label='Set as default' id='set-as-default' />
        )}
      </div>
    </div>
  );
};

export default NewCardForm;
