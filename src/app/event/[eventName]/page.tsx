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
import SimilarEvents from '@/app/event/[eventName]/components/SimilarEvents';
import Divider from '@/app/components/Divider';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Checkout from './components/checkout/Checkout';
import Header from '@/app/components/Header';
import Search from '@/app/components/search/Search';
import Socials from './components/Socials';
import Venue from './components/Venue';

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
      <div className='content-container pt-4 md:pt-6 md:flex md:gap-12 relative'>
        <div className='w-full md:flex-1 md:min-w-64 md:max-w-[400px] h-auto'>
          <div className='w-full relative aspect-square'>
            <Image
              src={event.media[0].src}
              alt={`${event.name} image`}
              fill
              sizes='100%'
              className='object-cover rounded-lg'
            />
          </div>
          <div className='hidden md:block'>
            {event.media && <Media event={event} />}
            {event.socials && <Socials socials={event.socials} />}
          </div>
        </div>
        <div className='w-full md:flex-1 mb-6 md:mb-12'>
          <div className='mt-5 mb-2 md:mt-0'>
            <div className='flex gap-3 mt-2 md:mt-3 ml-3.5 mb-1 float-right'>
              <SaveButton event={event} />
              <ShareButton />
            </div>
            <h1 className='text-4xl md:text-6xl mb-4 font-medium'>
              {event.name}
            </h1>
          </div>
          <Details event={event} categories={categories} venues={venues} />
          <Divider className='w-24 md:w-36 mx-auto ' />
          <About about={event.about} />
          <Venue venueId={event.venueId} venues={venues} />
        </div>
      </div>
      <Checkout event={event} venues={venues} />
      <SimilarEvents venues={venues} event={event} events={events} />
    </div>
  );
};

export default Event;
