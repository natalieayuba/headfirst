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
  const similarEvents = events
    .filter(
      ({ id, categoryId, subcategoryIds }) =>
        categoryId === event.categoryId &&
        id !== event.id &&
        subcategoryIds?.some((subcategory) =>
          event.subcategoryIds?.includes(subcategory)
        )
    )
    .slice(0, 10);

  return (
    <div className='py-10'>
      <h2 className='content-container mb-5'>Other events you might like</h2>
      <HorizontalScroll
        list={similarEvents}
        card={(event) => (
          <EventCard venues={venues} event={event} cardSize='w-36 md:w-56' />
        )}
      />
    </div>
  );
};

export default SimilarEvents;
