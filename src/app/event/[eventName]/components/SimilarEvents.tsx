import { type EventProps, type VenueProps } from '@/data/data';
import React from 'react';
import HorizontalScroll from '../../../components/HorizontalScroll';
import EventCard from '../../../components/EventCard';

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
    <div className='py-9'>
      <h2 className='mb-6 px-6'>Other events you might like</h2>
      <HorizontalScroll
        list={similarEvents}
        card={(event) => (
          <EventCard venues={venues} event={event} showTime showSaved />
        )}
      />
    </div>
  );
};

export default SimilarEvents;
