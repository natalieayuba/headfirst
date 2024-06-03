import React from 'react';
import EventCard from './EventCard';
import { events } from './events';

const PopularEvents = () => {
  return (
    <div className='margin-x-outer mt-24 mb-36'>
      <h2 className='text-center mb-12'>Popular Events</h2>
      <div>
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
};

export default PopularEvents;
