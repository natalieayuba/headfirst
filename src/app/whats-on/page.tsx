import React from 'react';
import FilteredEvents from './components/FilteredEvents';
import Filters from './components/filters/Filters';
import { getEvents, getVenues } from '@/data/utils';

const WhatsOn = async () => {
  const events = await getEvents();
  const venues = await getVenues();

  return (
    <div className='mt-16'>
      <Filters events={events} />
      <FilteredEvents events={events} venues={venues} />
    </div>
  );
};

export default WhatsOn;
