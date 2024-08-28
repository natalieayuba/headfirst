import Icon from '@/app/components/Icon';
import React from 'react';
import CheckoutSection from './CheckoutSection';
import type { TicketProps } from '@/data/data';
import { formatPrice } from '@/utils/formatting';

const Stepper = ({
  icon,
  onClick,
  disabled,
}: {
  icon: string;
  onClick: () => void;
  disabled: boolean;
}) => (
  <button
    className='text-lilac disabled:opacity-30'
    onClick={onClick}
    disabled={disabled}
  >
    <Icon name={icon} />
  </button>
);

const Tickets = ({
  tickets,
  ticketCount,
  setTicketCount,
}: {
  tickets: TicketProps[];
  ticketCount: number[];
  setTicketCount: (count: number[]) => void;
}) => {
  const handleStep = (index: number, icon: string) => {
    const step =
      icon === 'plus' ? ticketCount[index] + 1 : ticketCount[index] - 1;
    const updatedCount = ticketCount.map((count, i) =>
      i === index ? step : count
    );
    setTicketCount(updatedCount);
  };

  return (
    <CheckoutSection heading='Tickets'>
      <ol>
        {tickets.map((ticket, index) => (
          <li className='flex justify-between py-3 list-divider'>
            <div>
              <p>{ticket.name}</p>
              <p className='font-medium text-lg'>{formatPrice(ticket.price)}</p>
            </div>
            <div className='flex items-center w-20 justify-between'>
              <Stepper
                icon='minus'
                onClick={() => handleStep(index, 'minus')}
                disabled={ticketCount[index] === 0}
              />
              <span>{ticketCount[index]}</span>
              <Stepper
                icon='plus'
                onClick={() => handleStep(index, 'plus')}
                disabled={ticketCount[index] === 10}
              />
            </div>
          </li>
        ))}
      </ol>
    </CheckoutSection>
  );
};

export default Tickets;
