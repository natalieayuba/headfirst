import Input from '@/app/components/Input';
import React, { useState, type KeyboardEvent } from 'react';
import Checkbox from '@/app/components/Checkbox';
import type { NewCardDetails } from './Payment';

const NewCardForm = ({
  newCardDetails,
  setNewCardDetails,
}: {
  newCardDetails: NewCardDetails;
  setNewCardDetails: (details: NewCardDetails) => void;
}) => {
  const [saveCardChecked, setSaveCardChecked] = useState(false);

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

  const fields = [
    {
      id: 'name',
      label: 'Name on card',
      placeholder: 'John Doe',
      value: newCardDetails.name,
      autoComplete: 'cc-name',
      autoFocus: true,
      minLength: 3,
      maxLength: 100,
    },
    {
      id: 'card-number',
      label: 'Card number',
      placeholder: '1234 1234 1234 1234',
      inputMode: 'numeric',
      value: newCardDetails.cardNumber,
      autoComplete: 'cc-number',
      onKeyDown: validateCardNumber,
    },
    [
      {
        id: 'expiry-date',
        label: 'Expiry date',
        placeholder: 'MM/YY',
        inputMode: 'numeric',
        value: newCardDetails.expiryDate,
        onKeyUp: validateExpiryDate,
        className: 'w-1/2 rounded-r-none',
        maxLength: 5,
        autoComplete: 'cc-exp',
      },
      {
        id: 'security-code',
        label: 'Security code',
        placeholder: 'CVC',
        inputMode: 'numeric',
        value: newCardDetails.securityCode,
        className: 'w-1/2 rounded-l-none',
        maxLength: 3,
        autoComplete: 'cc-csc',
      },
    ],
    {
      id: 'postcode',
      label: 'Postcode',
      placeholder: 'AB12 CD3',
      value: newCardDetails.postcode,
      maxLength: 9,
      autoComplete: 'postal-code',
    },
  ];

  return (
    <div className='flex flex-col gap-4 py-1'>
      {fields.map((field, index) => {
        const Field = ({ field }: { field: any }) => (
          <Input
            type='text'
            label={field.label}
            placeholder={field.placeholder}
            id={field.id}
            value={field.value}
            minLength={field.minLength}
            maxLength={field.maxLength}
            clearInput={() => {
              setNewCardDetails({ ...newCardDetails, [field.id]: '' });
              console.log(field.id);
            }}
            // onChange={(e) =>
            //   setNewCardDetails({
            //     ...newCardDetails,
            //     [field.id]: e.target.value,
            //   })
            // }
            autoComplete={field.autoComplete}
            className={field.className}
            autoCorrect='off'
            spellCheck='false'
            required
          />
        );

        return Array.isArray(field) ? (
          <div className='flex' key={index}>
            {field.map((subField) => (
              <Field key={subField.id} field={subField} />
            ))}
          </div>
        ) : (
          <Field field={field} key={index} />
        );
      })}

      <fieldset className='flex flex-col gap-1'>
        <legend className='hidden'>Save options</legend>
        <ul>
          <li>
            <Checkbox
              label='Save card for future purchases'
              id='save-card'
              checked={saveCardChecked}
              onChange={() => setSaveCardChecked(!saveCardChecked)}
            />
          </li>
          {saveCardChecked && (
            <li>
              <Checkbox label='Set as default' id='set-as-default' />
            </li>
          )}
        </ul>
      </fieldset>
    </div>
  );
};

export default NewCardForm;
