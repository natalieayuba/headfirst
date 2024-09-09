import { Button } from '@/app/components/buttons/Button';
import Lightbox from '@/app/components/Lightbox';
import React, { useEffect, useState } from 'react';
import GetTickets from './GetTickets';
import Payment from './Payment';
import HyperLink from '@/app/components/Hyperlink';
import Checkbox from '@/app/components/Checkbox';
import Confirmation from './Confirmation';
import useLoader from '@/hooks/useLoader';
import Loader from '@/app/components/Loader';
import EventCard from '@/app/components/EventCard';
import type { EventProps, VenueProps } from '@/db/schema';
import OrderSummary from './OrderSummary';

interface CheckoutLightboxProps {
  event: EventProps;
  venues: VenueProps[];
  setGoing: (purchaseComplete: boolean) => void;
  closeLightbox: () => void;
}

export interface OrderProps {
  type: 'ticket' | 'selectedDonation' | 'customDonation' | 'fee';
  item: string;
  quantity: number;
  price: number;
}

const CheckoutLightbox = ({
  event,
  venues,
  setGoing,
  closeLightbox,
}: CheckoutLightboxProps) => {
  const [orderSummary, setOrderSummary] = useState<OrderProps[]>([]);
  const [step, setStep] = useState(0);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { loading, loadPage } = useLoader();

  const updateOrder = (
    type: OrderProps['type'],
    item: string,
    price: number,
    quantity = 1
  ) =>
    setOrderSummary(
      orderSummary.some((order) => order.item === item)
        ? (type === 'ticket' && quantity === 0) ||
          (type.includes('Donation') && price === 0)
          ? orderSummary.filter((order) => order.item !== item)
          : orderSummary.map((order) =>
              order.item === item
                ? order.type.includes('Donation')
                  ? { ...order, price }
                  : { ...order, quantity }
                : order
            )
        : [...orderSummary, { type, item, price, quantity }]
    );

  const disableButton = (disabled: boolean) => setButtonDisabled(disabled);

  const steps = [
    {
      content: (
        <GetTickets
          tickets={event.tickets}
          orderSummary={orderSummary}
          updateOrder={updateOrder}
          disableButton={disableButton}
        />
      ),
      buttonText: 'Checkout',
    },
    {
      content: <Payment disableButton={disableButton} />,
      footerContent: (
        <>
          <Checkbox
            label='Receive emails from the event organisers about future events'
            id='get-emails'
            className='border-y border-lilac border-opacity-20 py-4 my-4'
          />
          By purchasing, you are agreeing to Headfirst&apos;s{' '}
          <HyperLink href='#'>Terms & Conditions</HyperLink>
          {' and '}
          <HyperLink href='#'>Privacy Policy</HyperLink>.
        </>
      ),
      buttonText: 'Purchase tickets',
    },
  ];

  useEffect(() => {
    if (step === 2) {
      setGoing(true);
    }
  }, [step, setGoing]);

  return (
    <>
      {loading && <Loader />}
      <Lightbox
        onClose={closeLightbox}
        onBack={step === 1 ? () => setStep((step) => step - 1) : undefined}
        maxWidth='md:max-w-4xl'
      >
        <div className='max-w-sm sm:max-w-full mx-auto'>
          {step < 2 ? (
            <>
              <EventCard
                event={event}
                venues={venues}
                cardSize='min-h-14'
                imageSize='w-16'
                className='cursor-default'
                showSaved={false}
                showPrice={false}
                animated={false}
                horizontal
                narrow
              />
              <div className='sm:flex gap-16'>
                {steps[step].content}
                <div className='mt-6 flex-1'>
                  <OrderSummary orderSummary={orderSummary} step={step} />
                  <p className='secondary-text mt-1'>
                    {steps[step].footerContent}
                  </p>
                  <Button
                    className='w-full mt-4'
                    onClick={() => {
                      if (step === 1) {
                        loadPage(() => setStep((step) => step + 1));
                      } else {
                        setStep((step) => step + 1);
                      }
                    }}
                    disabled={buttonDisabled}
                  >
                    {steps[step].buttonText}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Confirmation event={event} venues={venues} />
          )}
        </div>
      </Lightbox>
    </>
  );
};

export default CheckoutLightbox;
