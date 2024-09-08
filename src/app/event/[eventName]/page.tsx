import React from 'react';
import { notFound } from 'next/navigation';
import { formatDate, formatEventUrl, toSentenceCase } from '@/utils/formatting';
import Image from 'next/image';
import Media from '@/app/event/[eventName]/components/media/Media';
import Breadcrumbs from '@/app/event/[eventName]/components/Breadcrumbs';
import Details from '@/app/event/[eventName]/components/Details';
import About from '@/app/event/[eventName]/components/About';
import SimilarEvents from '@/app/event/[eventName]/components/SimilarEvents';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Checkout from './components/checkout/Checkout';
import Header from '@/app/components/Header';
import Search from '@/app/components/search/Search';
import Socials from './components/Socials';
import Venue from './components/Venue';
import CTAButtons from './components/CTAButtons';
import type { Metadata } from 'next';
import HostCard from './HostCard';

interface EventProps {
  params: { eventName: string };
}

export async function generateMetadata({
  params,
}: EventProps): Promise<Metadata> {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();
  const event = events.find(
    ({ id, name }) =>
      formatEventUrl(id, name) === decodeURIComponent(params.eventName)
  );
  const venue = venues.find(({ id }) => event?.venueId === id);
  const category = categories.find(({ id }) => event?.categoryId === id);
  return {
    title: `${event?.name} Tickets | ${formatDate(event?.startDate!)} at ${
      venue?.name
    } | ${toSentenceCase(category?.name!)} in Bristol`,
  };
}

const Event = async ({ params }: EventProps) => {
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
      <div className='content-container pt-4 md:flex md:gap-12 relative'>
        <div className='w-full md:flex-1 md:min-w-64 md:max-w-[400px] h-auto'>
          <div className='w-full relative aspect-square'>
            <Image
              src={event.media[0].src}
              alt={`${event.name} image`}
              fill
              sizes='100%'
              className='object-cover rounded-lg'
            />
            <CTAButtons eventId={event.id} />
          </div>
          <div className='hidden md:block'>
            {event.media && <Media event={event} />}
            {event.socials && <Socials socials={event.socials} />}
          </div>
        </div>
        <div className='w-full md:flex-1 mt-8 mb-12 md:-mt-1 md:mb-12'>
          <h1 className='text-4xl md:text-6xl mb-6 font-medium'>
            {event.name}
          </h1>
          <Details event={event} categories={categories} venues={venues} />
          {/* <Divider className='w-24 md:w-36 mx-auto ' /> */}
          <HostCard />
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
