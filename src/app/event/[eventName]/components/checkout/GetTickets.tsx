import React from 'react';
import Tickets from './Tickets';
import Donate from './Donate';
import type { TicketProps } from '@/db/schema';
import type { OrderProps } from './CheckoutLightbox';

export interface GetTicketsProps {
  tickets?: TicketProps[];
  orderSummary: OrderProps[];
  updateOrder: (
    type: OrderProps['type'],
    item: string,
    price: number,
    quantity?: number
  ) => void;
  disableButton?: (disabled: boolean) => void;
}

const GetTickets = ({
  tickets,
  orderSummary,
  updateOrder,
  disableButton,
}: GetTicketsProps) => (
  <div className='flex-1'>
    <Tickets
      tickets={tickets}
      orderSummary={orderSummary}
      updateOrder={updateOrder}
      disableButton={disableButton}
    />
    <Donate updateOrder={updateOrder} orderSummary={orderSummary} />
  </div>
);

export default GetTickets;
