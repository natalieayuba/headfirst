import { Button } from '@/app/components/buttons/Button';
import EventCard from '@/app/components/EventCard';
import Icon from '@/app/components/Icon';
import Lightbox from '@/app/components/Lightbox';
import type { EventProps, TicketProps, VenueProps } from '@/data/data';
import React, { useEffect, useState, type ReactNode } from 'react';
import CheckoutSection from './CheckoutSection';
import Tickets from './Tickets';
import Donate from './Donate';
import { formatPrice } from '@/utils/formatting';

const CheckoutLightbox = ({
  event,
  venues,
  closeLightbox,
}: {
  event: EventProps;
  venues: VenueProps[];
  closeLightbox: () => void;
}) => {
  const [ticketCount, setTicketCount] = useState<number[]>(
    event.tickets.map(() => 0)
  );
  const [donation, setDonation] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total: number = 0;
    event.tickets.forEach(
      ({ price }, index) => (total += price * ticketCount[index])
    );
    total += donation;
    setTotal(total);
  }, [ticketCount, donation]);

  return (
    <Lightbox onClose={closeLightbox}>
      <div className='flex gap-6 flex-col min-h-dvh'>
        {/* // fix event card by making each part different */}
        <EventCard
          event={event}
          venues={venues}
          horizontal
          size='xs'
          hidePrice
        />
        <Tickets
          tickets={event.tickets}
          ticketCount={ticketCount}
          setTicketCount={setTicketCount}
        />
        <Donate setDonation={setDonation} />
        <div>
          <div className='flex justify-between text-xl font-medium'>
            <p>Total</p>
            <p>£{total > 0 ? total.toFixed(2) : total}</p>
          </div>
          <p className='secondary-text'>
            Total price includes a booking fee of 80p per ticket which will be
            donated to local causes. <a className='link'>Find out more.</a>
          </p>
          <Button
            className='w-full mt-4'
            disabled={!ticketCount.some((count) => count > 0)}
          >
            Checkout
          </Button>
        </div>
      </div>
    </Lightbox>
  );
};

export default CheckoutLightbox;
