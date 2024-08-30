import { Button } from '@/app/components/buttons/Button';
import Divider from '@/app/components/Divider';
import type { EventProps, VenueProps } from '@/data/data';
import { formatDate } from '@/utils/formatting';
import Image from 'next/image';
import React from 'react';

const Confirmation = ({
  event,
  venues,
}: {
  event: EventProps;
  venues: VenueProps[];
}) => (
  <div
    className='flex flex-col gap-7 items-center text-center'
    style={{ height: 'calc(100dvh - 100px)' }}
  >
    <Image
      src={event.image}
      alt={event.name}
      width={0}
      height={0}
      sizes='100vw'
      className='w-32 h-32 rounded-lg'
    ></Image>
    <div>
      <h2 className='text-3xl'>
        <span className='block text-2xl'>You&apos;re going to</span>
        {event.name}
      </h2>
      <p className='mt-1'>{formatDate(event.startDate, true)}</p>
      <p>{venues.find(({ id }) => id === event.venueId)?.name}</p>
    </div>
    <Divider className='w-32 [&&]:m-0' />
    <p className='text-white text-opacity-75'>
      Your tickets have been emailed to
      <span className='font-medium block text-white text-opacity-100'>
        johndoe@email.com
      </span>
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
