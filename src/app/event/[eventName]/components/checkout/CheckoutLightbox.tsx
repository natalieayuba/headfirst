import { Button } from '@/app/components/buttons/Button';
import EventCard from '@/app/components/EventCard';
import Lightbox from '@/app/components/Lightbox';
import type { EventProps, VenueProps } from '@/data/data';
import React, { useEffect, useState } from 'react';
import GetTickets from './GetTickets';
import Payment from './Payment';
import HyperLink from '@/app/components/Hyperlink';

const Total = ({ total }: { total: number }) => (
  <div className='flex justify-between text-xl font-medium'>
    <p>Total</p>
    <p>£{total > 0 ? total.toFixed(2) : total}</p>
  </div>
);

const CheckoutLightbox = ({
  event,
  venues,
  closeLightbox,
}: {
  event: EventProps;
  venues: VenueProps[];
  closeLightbox: () => void;
}) => {
  const bookingFee = 0.8;
  const [total, setTotal] = useState(0);
  const [orderSummary, setOrderSummary] = useState<
    { text: string; price: number }[]
  >([]);
  const [step, setStep] = useState(0);
  const [ticketCount, setTicketCount] = useState<number[]>(
    event.tickets.map(() => 0)
  );
  const [donation, setDonation] = useState(0);
  const [selectedPaymentOption, setSelectedPaymentOption] = useState(-1);
  const [newCardDetails, setNewCardDetails] = useState([]);

  const steps = [
    {
      content: (
        <GetTickets
          tickets={event.tickets}
          ticketCount={ticketCount}
          setTicketCount={(count) => setTicketCount(count)}
          donation={donation}
          setDonation={(donation) => setDonation(donation)}
        />
      ),
      footerContent: (
        <>
          Total price includes a booking fee of 80p per ticket which will be
          donated to local causes. <HyperLink href='#'>Find out more</HyperLink>
          .
        </>
      ),
      buttonText: 'Checkout',
      buttonDisabled: !ticketCount.some((count) => count > 0),
    },
    {
      content: (
        <Payment
          selectedPaymentOption={selectedPaymentOption}
          setSelectedPaymentOption={setSelectedPaymentOption}
        />
      ),
      footerContent: (
        <>
          <label
            htmlFor='get-emails'
            className='text-white text-opacity-60 flex gap-4 border-y border-lilac border-opacity-20 py-4 my-4'
          >
            <input className='checkbox' type='checkbox' id='get-emails' />
            Receive emails from the event organisers about future events
          </label>
          <p>
            By purchasing, you are agreeing to Headfirst's{' '}
            <HyperLink href='#'>Terms & Conditions</HyperLink>
            {' and '}
            <HyperLink href='#'>Privacy Policy</HyperLink>.
          </p>
        </>
      ),
      buttonText: 'Purchase tickets',
      buttonDisabled:
        selectedPaymentOption === -1 ||
        (selectedPaymentOption === 1 && newCardDetails.length === 0),
    },
  ];

  useEffect(() => {
    let total: number = 0;
    event.tickets.forEach(
      ({ price }, index) => (total += price * ticketCount[index])
    );
    total = total > 0 ? total + bookingFee : total;
    total += donation;
    setTotal(total);
  }, [event.tickets, ticketCount, donation]);

  useEffect(() => {
    if (step === 1) {
      const summary = [];
      event.tickets.forEach(({ name, price }, index) => {
        if (ticketCount[index] > 0) {
          summary.push({
            text: `${ticketCount[index]}x ${name}`,
            price: price * ticketCount[index],
          });
        }
      });
      if (donation) {
        summary.push({ text: 'Donation', price: donation });
      }
      summary.push({ text: 'Booking fee', price: bookingFee });
      setOrderSummary(summary);
    }
  }, [step]);

  return (
    <Lightbox
      onClose={closeLightbox}
      onBack={step > 0 ? () => setStep((step) => step - 1) : undefined}
    >
      <div className='flex gap-6 flex-col min-h-dvh'>
        {/* // fix event card by making each part different */}
        <EventCard
          event={event}
          venues={venues}
          horizontal
          size='xs'
          hidePrice
        />
        {steps[step].content}
        <div>
          {step > 0 && (
            <div>
              <h2 className='mb-2'>Order Summary</h2>
              {orderSummary.map(({ text, price }) => (
                <div className='flex justify-between'>
                  <p>{text}</p>
                  <p>£{price.toFixed(2)}</p>
                </div>
              ))}
            </div>
          )}
          <Total total={total} />
          <p className='secondary-text'>{steps[step].footerContent}</p>
          <Button
            className='w-full mt-4'
            onClick={() => setStep((step) => step + 1)}
            disabled={steps[step].buttonDisabled}
          >
            {steps[step].buttonText}
          </Button>
        </div>
      </div>
    </Lightbox>
  );
};

export default CheckoutLightbox;
