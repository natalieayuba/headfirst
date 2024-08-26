import { events, type EventProps } from '@/data/data';
import React from 'react';
import HorizontalScroll from '../HorizontalScroll';
import EventCard from '../EventCard';

const SimilarEvents = ({ event }: { event: EventProps }) => {
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
        card={(event) => <EventCard event={event} showTime />}
      />
    </div>
  );
};

export default SimilarEvents;
