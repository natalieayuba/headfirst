'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import { formatEventUrl, formatPrice } from '@/utils/formatting';
import Image from 'next/image';
import SaveButton from '@/components/buttons/SaveButton';
import ShareButton from '@/components/buttons/ShareButton';
import Divider from '@/components/Divider';
import { Button } from '@/components/buttons/Button';
import { events } from '@/data/data';
import Media from '@/components/event/media/Media';
import Breadcrumbs from '@/components/event/Breadcrumbs';
import Details from '@/components/event/Details';
import About from '@/components/event/About';
import Venue from '@/components/event/Venue';
import SimilarEvents from '@/components/event/SimilarEvents';

const Event = ({ params }: { params: { eventName: string } }) => {
  const event = events.find(
    ({ id, name }) =>
      formatEventUrl(id, name) === decodeURIComponent(params.eventName)
  );

  if (!event) {
    notFound();
  }

  return (
    <div className='pt-16'>
      <Breadcrumbs categoryId={event.categoryId} />
      <div className='p-6 pt-4'>
        <div className='w-full aspect-square relative'>
          <Image
            src={event.image}
            alt={`${event.name} image`}
            fill
            sizes='100%'
            className='object-cover rounded-lg'
          />
        </div>
        <div className='mt-5 mb-2'>
          <div className='flex gap-2 mt-2 ml-3 float-right'>
            <SaveButton saved={event.saved} />
            <ShareButton />
          </div>
          <h1 className='text-4xl font-medium'>{event.name}</h1>
        </div>
        <Details event={event} />
        <Divider className='w-28 mx-auto' />
        <About about={event.about} />
        <Venue venueId={event.venueId} />
      </div>
      {event.media && <Media media={event.media} />}
      <div className='bg-night px-6 py-4 flex justify-between items-center sticky bottom-0'>
        <p className='text-2xl font-medium'>{formatPrice(event.tickets)}</p>
        <Button onClick={() => ''}>Get tickets </Button>
      </div>
      <SimilarEvents event={event} />
    </div>
  );
};

export default Event;
