'use client';
import { Button } from '@/app/components/buttons/Button';
import useLightbox from '@/hooks/useLightbox';
import { formatPriceRange } from '@/utils/formatting';
import React from 'react';
import CheckoutLightbox from './CheckoutLightbox';
import useLoader from '@/hooks/useLoader';
import Loader from '@/app/components/Loader';
import type { EventProps, VenueProps } from '@/db/schema';

const Checkout = ({
  event,
  venues,
}: {
  event: EventProps;
  venues: VenueProps[];
}) => {
  const { isOpen, openLightbox, closeLightbox } = useLightbox();
  const { loading, loadPage } = useLoader();

  return (
    <>
      {loading && <Loader />}
      <div className='bg-night sticky bottom-0'>
        <div className='content-container py-4 flex justify-between items-center'>
          <p className='text-2xl font-medium'>
            {formatPriceRange(event.tickets)}
          </p>
          <Button onClick={() => loadPage(openLightbox)}>Get tickets</Button>
        </div>
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
