import React from 'react';
import DateDropdown from './components/filters/DateDropdown';
import FilteredEvents from './components/FilteredEvents';
import CategoryChips from './components/filters/CategoryChips';
import PriceDropdown from './components/filters/PriceDropdown';
import { getCategories, getEvents, getVenues } from '@/db/queries';
import Header from '../components/Header';
import Search from '../components/search/Search';

const WhatsOn = async () => {
  const events = await getEvents();
  const venues = await getVenues();
  const categories = await getCategories();

  return (
    <div className='mt-16'>
      <Header search={<Search />} />
      <h1 className='text-4xl content-container pt-6 md:pt-8 pb-2'>
        What&apos;s on in Bristol
      </h1>
      <div className='flex flex-col gap-2'>
        <div className='flex gap-2 content-container'>
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
