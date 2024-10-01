import React from 'react';
import { notFound } from 'next/navigation';
import { formatDate, formatEventUrl, toSentenceCase } from '@/utils/formatting';
import Media from '@/app/event/[eventName]/components/media/Media';
import Breadcrumbs from '@/app/event/[eventName]/components/Breadcrumbs';
import Details from '@/app/event/[eventName]/components/Details';
import About from '@/app/event/[eventName]/components/About';
import SimilarEvents from '@/app/event/[eventName]/components/SimilarEvents';
import {
  getCategories,
  getEvents,
  getPromoters,
  getVenues,
} from '@/db/queries';
import Checkout from './components/checkout/Checkout';
import Venue from './components/Venue';
import type { Metadata } from 'next';
import Main from '@/app/components/Main';
import PromoterCard from './components/PromoterCard';

interface EventProps {
  params: { eventName: string };
}

export async function generateMetadata({
  params,
}: EventProps): Promise<Metadata> {
  const event = await getEvents().then((events) =>
    events.find(
      ({ id, name }) =>
        formatEventUrl(id, name) === decodeURIComponent(params.eventName)
    )
  );
  const venue = await getVenues().then((venues) =>
    venues.find(({ id }) => event?.venueId === id)
  );
  const category = await getCategories().then((categories) =>
    categories.find(({ id }) => event?.categoryId === id)
  );

  return {
    title: `${event?.name} Tickets | ${formatDate(event?.startDate!)} at ${
      venue?.name
    } | ${toSentenceCase(category?.name!)} in Bristol`,
  };
}

const Event = async ({ params }: EventProps) => {
  const events = await getEvents();
  const event = events.find(
    ({ id, name }) =>
      formatEventUrl(id, name) === decodeURIComponent(params.eventName)
  );
  if (!event) {
    notFound();
  }
  const venues = await getVenues();
  const venue = venues.find(({ id }) => id === event?.venueId)!;
  const category = await getCategories().then(
    (categories) => categories.find(({ id }) => id === event?.categoryId)!
  );
  const promoter = await getPromoters().then(
    (promoters) => promoters.find(({ id }) => id === event?.promoterId)!
  );

  return (
    <Main>
      <Breadcrumbs category={category} />
      <div className='content-container md:flex md:gap-12 relative'>
        <Media event={event} />
        <div className='w-full md:flex-1 mt-7 mb-12 md:-mt-1 md:mb-12'>
          <h1 className='text-4xl md:text-6xl mb-4 font-medium'>
            {event.name}
          </h1>
          <Details event={event} category={category} venue={venue} />
          <PromoterCard promoter={promoter} />
          <About about={event.about} />
          <Venue venue={venue} />
        </div>
      </div>
      <Checkout event={event} venue={venue} promoter={promoter} />
      <SimilarEvents event={event} events={events} venues={venues} />
    </Main>
  );
};

export default Event;
