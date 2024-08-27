import React from 'react';
import { getCategories, getEvents, getVenues } from '@/data/utils';
import DateDropdown from './components/filters/DateDropdown';
import FilteredEvents from './components/FilteredEvents';
import CategoryChips from './components/filters/CategoryChips';
import PriceDropdown from './components/filters/PriceDropdown';

const WhatsOn = async () => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  return (
    <div className='mt-16'>
      <h1 className='text-4xl p-6 pb-2'>What&apos;s on in Bristol</h1>
      <div className='flex flex-col gap-2'>
        <div className='pl-6 flex gap-2'>
          <DateDropdown />
          <PriceDropdown events={events} />
        </div>
        <CategoryChips categories={categories} />
      </div>
      <FilteredEvents events={events} venues={venues} />
    </div>
  );
};

export default WhatsOn;
