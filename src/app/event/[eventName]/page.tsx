import React from 'react';
import { notFound } from 'next/navigation';
import { formatEventUrl, formatPrice } from '@/utils/formatting';
import Image from 'next/image';
import SaveButton from '@/app/components/buttons/SaveButton';
import ShareButton from '@/app/components/buttons/ShareButton';
import { Button } from '@/app/components/buttons/Button';
import Media from '@/app/event/[eventName]/components/media/Media';
import Breadcrumbs from '@/app/event/[eventName]/components/Breadcrumbs';
import Details from '@/app/event/[eventName]/components/Details';
import About from '@/app/event/[eventName]/components/About';
import Venue from '@/app/event/[eventName]/components/Venue';
import SimilarEvents from '@/app/event/[eventName]/components/SimilarEvents';
import Divider from '@/app/components/Divider';
import { getCategories, getEvents, getVenues } from '@/utils/db';

const Event = async ({ params }: { params: { eventName: string } }) => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  const event = events.find(
    ({ id, name }) =>
      formatEventUrl(id, name) === decodeURIComponent(params.eventName)
  );

  if (!event) {
    notFound();
  }

  return (
    <div className='pt-16'>
      <Breadcrumbs categoryId={event.categoryId} categories={categories} />
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
          <div className='flex gap-3 mt-2 ml-3 float-right'>
            <SaveButton event={event} />
            <ShareButton />
          </div>
          <h1 className='text-4xl font-medium'>{event.name}</h1>
        </div>
        <Details event={event} categories={categories} venues={venues} />
        <Divider className='w-28 mx-auto' />
        <About about={event.about} />
        <Venue venueId={event.venueId} venues={venues} />
      </div>
      {event.media && <Media media={event.media} />}
      <div className='bg-night px-6 py-4 flex justify-between items-center sticky bottom-0'>
        <p className='text-2xl font-medium'>{formatPrice(event.tickets)}</p>
        <Button>Get tickets </Button>
      </div>
      <SimilarEvents venues={venues} event={event} events={events} />
    </div>
  );
};

export default Event;
