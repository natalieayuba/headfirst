import React, { useEffect, useState } from 'react';
import type { OrderProps } from './CheckoutLightbox';
import HyperLink from '@/app/components/Hyperlink';

interface OrderSummaryProps {
  orderSummary: OrderProps[];
  step: number;
}

const OrderSummary = ({ orderSummary, step }: OrderSummaryProps) => {
  const bookingFee = 0.85;
  const [totalBookingFee, setTotalBookingFee] = useState(0);

  const SummaryItem = ({ order }: { order: OrderProps }) => (
    <div key={order.item} className='flex justify-between mb-0.5'>
      <p>
        {order.type === 'ticket' && `${order.quantity}x `}
        {order.item}
      </p>
      <p>
        {order.price === 0
          ? 'Free'
          : `£${(order.price * order.quantity).toFixed(2)}`}
      </p>
    </div>
  );

  useEffect(() => {
    setTotalBookingFee(
      bookingFee *
        orderSummary
          .filter(({ type, price }) => type === 'ticket' && price > 0)
          .reduce((a, b) => a + b.quantity, 0)
    );
  }, [orderSummary]);

  return (
    <div>
      {orderSummary.length > 0 && (
        <h2 className='mb-2 text-xl md:text-2xl'>Order Summary</h2>
      )}
      {orderSummary
        .filter(({ type }) => type === 'ticket')
        .map((order) => (
          <SummaryItem key={order.item} order={order} />
        ))}
      {orderSummary
        .filter(({ type }) => type.includes('Donation'))
        .map((order) => (
          <SummaryItem key={order.item} order={order} />
        ))}
      {orderSummary.some(
        ({ type, price }) => type === 'ticket' && price > 0
      ) && (
        <SummaryItem
          order={{
            type: 'fee',
            item: 'Booking fee',
            price: totalBookingFee,
            quantity: 1,
          }}
        />
      )}

      <div className='flex justify-between text-xl font-medium mt-1.5'>
        <p>Total</p>
        <p>
          {orderSummary.length > 0
            ? orderSummary.reduce((a, b) => a + b.price * b.quantity, 0) === 0
              ? 'Free'
              : `£${(
                  orderSummary.reduce((a, b) => a + b.price * b.quantity, 0) +
                  totalBookingFee
                ).toFixed(2)}`
            : '-'}
        </p>
      </div>
      {totalBookingFee > 0 && step === 0 && (
        <p className='secondary-text'>
          Total includes a booking fee of 85p per ticket which will be donated
          to local causes.
          <HyperLink href='#'> Find out more.</HyperLink>
        </p>
      )}
    </div>
  );
};

export default OrderSummary;
