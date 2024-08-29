import { Button } from '@/app/components/buttons/Button';
import EventCard from '@/app/components/EventCard';
import Lightbox from '@/app/components/Lightbox';
import type { EventProps, VenueProps } from '@/data/data';
import React, { useEffect, useState } from 'react';
import GetTickets from './GetTickets';
import Payment from './Payment';
import HyperLink from '@/app/components/Hyperlink';
import Checkbox from '@/app/components/Checkbox';
import Confirmation from './Confirmation';

export interface NewCardDetails {
  name: string;
  cardNumber: string;
  expiryDate: string;
  securityCode: string;
  postcode: string;
  save: boolean;
  default: boolean;
}

export const cardDetailsDefault = {
  name: '',
  cardNumber: '',
  expiryDate: '',
  securityCode: '',
  postcode: '',
  save: false,
  default: false,
};

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
  const [newCardDetails, setNewCardDetails] = useState(cardDetailsDefault);

  const steps = [
    {
      content: (
        <GetTickets
          tickets={event.tickets}
          ticketCount={ticketCount}
          setTicketCount={(count) => setTicketCount(count)}
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
          newCardDetails={newCardDetails}
          setNewCardDetails={(details) => setNewCardDetails(details)}
        />
      ),
      footerContent: (
        <>
          <Checkbox
            label='Receive emails from the event organisers about future events'
            id='get-emails'
            className='border-y border-lilac border-opacity-20 py-4 my-4'
          />
          <p>
            By purchasing, you are agreeing to Headfirst&apos;s{' '}
            <HyperLink href='#'>Terms & Conditions</HyperLink>
            {' and '}
            <HyperLink href='#'>Privacy Policy</HyperLink>.
          </p>
        </>
      ),
      buttonText: 'Purchase tickets',
      buttonDisabled:
        selectedPaymentOption === -1 ||
        (selectedPaymentOption === 1 &&
          newCardDetails &&
          Object.values(newCardDetails).some((value) => value === '')),
    },
    {
      content: <Confirmation event={event} venues={venues} />,
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
      <div className='flex gap-6 flex-col flex-1'>
        {/* // fix event card by making each part different */}
        {step < 2 && (
          <EventCard
            event={event}
            venues={venues}
            horizontal
            size='xs'
            hidePrice
          />
        )}
        {steps[step].content}
        {step < 2 && (
          <div>
            {step === 1 && (
              <div>
                <h2 className='mb-2'>Order Summary</h2>
                {orderSummary.map(({ text, price }) => (
                  <div key={text} className='flex justify-between'>
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
        )}
      </div>
    </Lightbox>
  );
};

export default CheckoutLightbox;
