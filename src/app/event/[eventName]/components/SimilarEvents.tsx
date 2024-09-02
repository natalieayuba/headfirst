import React from 'react';
import HorizontalScroll from '../../../components/HorizontalScroll';
import EventCard from '../../../components/EventCard';
import type { EventProps, VenueProps } from '@/db/schema';

interface SimilarEventsProps {
  event: EventProps;
  events: EventProps[];
  venues: VenueProps[];
}

const SimilarEvents = ({ event, events, venues }: SimilarEventsProps) => {
  const max = 5;
  const similarEvents = events
    .filter(
      ({ id, categoryId, subcategoryIds }) =>
        categoryId === event.categoryId &&
        id !== event.id &&
        subcategoryIds?.some((subcategory) =>
          event.subcategoryIds?.includes(subcategory)
        )
    )
    .slice(0, max);

  if (similarEvents.length < max) {
    similarEvents.push(
      ...events
        .filter(({ id }) => !similarEvents.some((event) => event.id === id))
        .filter(({ categoryId }) => categoryId === '1003')
        .sort(() => 0.5 - Math.random())
        .slice(0, max - similarEvents.length)
    );
    similarEvents.sort((a, b) => a.startDate.localeCompare(b.startDate));
  }

  return (
    <div className='py-10 md:py-12'>
      <h2 className='content-container mb-5 md:mb-6'>
        Other events you might like
      </h2>
      <HorizontalScroll
        className='md:grid md:grid-cols-5 md:gap-4'
        list={similarEvents}
        card={(event) => (
          <EventCard venues={venues} event={event} cardSize='w-36 md:w-full' />
        )}
      />
    </div>
  );
};

export default SimilarEvents;
