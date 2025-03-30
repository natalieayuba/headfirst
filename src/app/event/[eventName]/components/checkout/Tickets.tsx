import Icon from '@/app/components/Icon';
import React, { useEffect } from 'react';
import CheckoutSection from './CheckoutSection';
import { formatPrice } from '@/utils/formatting';
import type { GetTicketsProps } from './GetTickets';

interface StepperProps {
  type: 'plus' | 'minus';
  index: number;
}

const Tickets = ({
  tickets,
  orderSummary,
  updateOrder,
  disableButton,
}: GetTicketsProps) => {
  const min = 0,
    max = 10;

  const Stepper = ({ type, index }: StepperProps) => {
    const handleStep = (type: StepperProps['type']) => {
      let quantity =
        orderSummary.find(({ item }) => item === tickets![index].name)
          ?.quantity ?? min;
      quantity += type === 'minus' ? -1 : 1;
      updateOrder(
        'ticket',
        tickets![index].name,
        tickets![index].price,
        quantity
      );
    };

    return (
      <button
        type='button'
        className='text-lilac disabled:opacity-30 default-hover'
        onClick={() => handleStep(type)}
        disabled={
          (type === 'minus' &&
            !orderSummary.some(({ item }) => item === tickets![index].name)) ||
          orderSummary.find(({ item }) => item === tickets![index].name)
            ?.quantity === min ||
          (type === 'plus' &&
            orderSummary.find(({ item }) => item === tickets![index].name)
              ?.quantity === max)
        }
      >
        <Icon name={type} />
      </button>
    );
  };
  useEffect(() => {
    disableButton!(!orderSummary.some(({ type }) => type === 'ticket'));
  }, [orderSummary, disableButton]);

  return (
    <CheckoutSection heading='Tickets'>
      <ol>
        {tickets!.map(({ name, price }, index) => {
          return (
            <li key={name} className='flex justify-between py-3 list-divider'>
              <div>
                <p>{name}</p>
                <p className='font-medium text-xl leading-none'>
                  {price === 0 ? 'Free' : formatPrice(price)}
                </p>
              </div>
              <div className='flex items-center w-20 justify-between'>
                <Stepper type='minus' index={index} />
                <span>
                  {orderSummary.find(({ item }) => item === name)?.quantity ??
                    min}
                </span>
                <Stepper type='plus' index={index} />
              </div>
            </li>
          );
        })}
      </ol>
    </CheckoutSection>
  );
};

export default Tickets;
