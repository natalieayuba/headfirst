'use client';
import { Button } from '@/app/components/buttons/Button';
import useLightbox from '@/hooks/useLightbox';
import { formatDate, formatPriceRange } from '@/utils/formatting';
import React, { useState } from 'react';
import CheckoutLightbox from './CheckoutLightbox';
import useLoader from '@/hooks/useLoader';
import Loader from '@/app/components/Loader';
import type { EventProps, PromoterProps, VenueProps } from '@/db/schema';

interface CheckoutProps {
  event: EventProps;
  venue: VenueProps;
  promoter: PromoterProps;
}

const Checkout = ({ event, venue, promoter }: CheckoutProps) => {
  const { isOpen, openLightbox, closeLightbox } = useLightbox();
  const { loading, loadPage } = useLoader();
  const [going, setGoing] = useState(false);

  return (
    <>
      {loading && <Loader />}
      <div className='bg-night sticky bottom-0'>
        <div className='content-container py-4 px-6 flex justify-between items-center gap-6 md:justify-end'>
          <div className='hidden md:block mr-auto'>
            <p>{event.name}</p>
            <p className='secondary-text'>
              {formatDate(event.startDate, true)}
            </p>
          </div>
          <p className='text-2xl font-medium'>
            {going ? "You're going!" : formatPriceRange(event.tickets)}
          </p>
          <Button onClick={() => loadPage(openLightbox)}>
            Get {going ? 'more' : ''} tickets
          </Button>
        </div>
      </div>
      {isOpen && (
        <CheckoutLightbox
          event={event}
          venue={venue}
          promoter={promoter}
          closeLightbox={closeLightbox}
          setGoing={setGoing}
        />
      )}
    </>
  );
};

export default Checkout;
