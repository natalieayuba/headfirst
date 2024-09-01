import React from 'react';
import { notFound } from 'next/navigation';
import { formatEventUrl } from '@/utils/formatting';
import Image from 'next/image';
import SaveButton from '@/app/components/buttons/SaveButton';
import ShareButton from '@/app/components/buttons/ShareButton';
import Media from '@/app/event/[eventName]/components/media/Media';
import Breadcrumbs from '@/app/event/[eventName]/components/Breadcrumbs';
import Details from '@/app/event/[eventName]/components/Details';
import About from '@/app/event/[eventName]/components/About';
import Venue from '@/app/event/[eventName]/components/Venue';
import SimilarEvents from '@/app/event/[eventName]/components/SimilarEvents';
import Divider from '@/app/components/Divider';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Checkout from './components/checkout/Checkout';
import Header from '@/app/components/Header';
import Search from '@/app/components/search/Search';

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
      <Header search={<Search />} />
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
      <Checkout event={event} venues={venues} />
      <SimilarEvents venues={venues} event={event} events={events} />
    </div>
  );
};

export default Event;
