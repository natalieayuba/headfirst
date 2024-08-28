'use client';
import { Button } from '@/app/components/buttons/Button';
import type { EventProps, VenueProps } from '@/data/data';
import useLightbox from '@/hooks/useLightbox';
import { formatPriceRange } from '@/utils/formatting';
import React from 'react';
import CheckoutLightbox from './CheckoutLightbox';

const Checkout = ({
  event,
  venues,
}: {
  event: EventProps;
  venues: VenueProps[];
}) => {
  const { isOpen, openLightbox, closeLightbox } = useLightbox();

  return (
    <>
      <div className='bg-night px-6 py-4 flex justify-between items-center sticky bottom-0'>
        <p className='text-2xl font-medium'>
          {formatPriceRange(event.tickets)}
        </p>
        <Button onClick={openLightbox}>Get tickets</Button>
      </div>
      {isOpen && (
        <CheckoutLightbox
          event={event}
          venues={venues}
          closeLightbox={closeLightbox}
        />
      )}
    </>
  );
};

export default Checkout;
