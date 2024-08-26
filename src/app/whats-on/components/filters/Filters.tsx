import React from 'react';
import DateDropdown from './DateDropdown';
import PriceDropdown from './PriceDropdown';
import CategoryChips from './CategoryChips';
import type { EventProps } from '@/data/data';
import { getCategories } from '@/data/utils';

const Filters = async ({ events }: { events: EventProps[] }) => {
  const categories = await getCategories();
  return (
    <form>
      <h1 className='text-4xl p-6 pb-2'>What&apos;s on in Bristol</h1>
      <div className='flex flex-col gap-2'>
        <div className='pl-6 flex gap-2'>
          <DateDropdown />
          <PriceDropdown events={events} />
        </div>
        <CategoryChips categories={categories} />
      </div>
    </form>
  );
};

export default Filters;
