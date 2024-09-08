import React from 'react';
import type { OrderProps } from './CheckoutLightbox';

const OrderSummary = ({ orderSummary }: { orderSummary: OrderProps[] }) => {
  const bookingFee = 0.85;

  const SummaryItem = ({ order }: { order: OrderProps }) => (
    <div key={order.item} className='flex justify-between mb-0.5'>
      <p>
        {order.item !== 'Booking fee' &&
          order.item !== 'Donation' &&
          `${order.quantity}x `}
        {order.item}
      </p>
      <p>£{(order.price * order.quantity).toFixed(2)}</p>
    </div>
  );

  return (
    <div>
      <h2 className='mb-2 text-2xl'>Order Summary</h2>
      {orderSummary.map((order, index) => (
        <React.Fragment key={order.item}>
          <SummaryItem order={order} />
          {orderSummary.some(({ type }) => type === 'ticket') &&
            index === orderSummary.length - 1 && (
              <SummaryItem
                order={{
                  type: 'fee',
                  item: 'Booking fee',
                  price: bookingFee,
                  quantity: 1,
                }}
              />
            )}
        </React.Fragment>
      ))}
      <div className='flex justify-between text-xl font-medium mt-1.5'>
        <p>Total</p>
        <p>
          £
          {orderSummary.length > 0
            ? (
                orderSummary.reduce((a, b) => a + b.price * b.quantity, 0) +
                (orderSummary.some(({ type }) => type === 'ticket')
                  ? bookingFee
                  : 0)
              ).toFixed(2)
            : 0}
        </p>
      </div>
    </div>
  );
};

export default OrderSummary;
