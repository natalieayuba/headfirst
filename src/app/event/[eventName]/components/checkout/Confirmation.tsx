import { Button } from '@/app/components/buttons/Button';
import Divider from '@/app/components/Divider';
import { Image } from '@/app/components/EventCard';
import type { EventProps, VenueProps } from '@/db/schema';
import { formatDate } from '@/utils/formatting';
import React from 'react';

interface ConfirmationProps {
  event: EventProps;
  venue: VenueProps;
}

const Confirmation = ({ event, venue }: ConfirmationProps) => (
  <div
    className='flex flex-col gap-7 items-center text-center md:pt-12 max-w-lg mx-auto'
    style={{ height: 'calc(100dvh - 100px)' }}
  >
    <Image
      src={event.media[0].src}
      alt={`${event.name} image`}
      imageSize='w-28 md:w-36'
    />
    <div>
      <h2 className='text-3xl md:text-5xl md:my-2'>
        <span className='block text-2xl md:text-3xl md:mb-1'>
          You&apos;re going to
        </span>
        {event.name}
      </h2>
      <p className='mt-1'>{formatDate(event.startDate, true)}</p>
      <p>{venue.name}</p>
    </div>
    <Divider className='w-32 [&&]:m-0' />
    <p className='font-light'>
      Your tickets have been emailed to
      <span className='font-medium block'>johndoe@email.com</span>
    </p>
    <Button>View tickets</Button>
    <p className='mt-auto secondary-text'>
      You have just helped the Bristol music scene. Thanks for choosing a local
      ticket outlet and helping us support Bristol&apos;s independent and
      underground venues.
    </p>
  </div>
);

export default Confirmation;
