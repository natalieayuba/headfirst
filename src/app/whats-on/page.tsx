'use client';
import React, { useEffect, useState } from 'react';
import { events } from '@/data/data';
import DateDropdown from '@/components/filters/DateDropdown';
import EventCard from '@/components/EventCard';
import { formatDate } from '@/utils/formatting';
import PriceDropdown from '@/components/filters/PriceDropdown';
import CategoryChips from '@/components/filters/CategoryChips';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const WhatsOn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [filteredEvents, setFilteredEvents] = useState(events);

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    for (const key of params.keys()) {
      params.delete(key);
    }
    router.replace(pathname);
  };

  useEffect(() => {
    // scrolls down on refresh?? might have to do a scroll to top situation?
    // sometimes shows up empty? maybe a server issue idk...
    setFilteredEvents(
      events.filter(
        ({ startDate, categoryId, tickets, subcategoryIds }) =>
          (!searchParams.has('date') ||
            formatDate(searchParams?.get('date')?.toString() as string) ===
              formatDate(startDate)) &&
          (!searchParams.has('priceFrom') ||
            tickets.some(
              ({ price }) =>
                price >= Number(searchParams.get('priceFrom')?.toString()) &&
                price <= Number(searchParams.get('priceTo')?.toString())
            )) &&
          (!searchParams.has('categoryId') ||
            searchParams.get('categoryId')?.toString() === categoryId) &&
          (!searchParams.has('subcategoryId') ||
            subcategoryIds.includes(
              searchParams.get('subcategoryId')?.toString()!
            ))
      )
    );
  }, [searchParams]);

  return (
    <div className='mt-16'>
      <form>
        <h1 className='text-4xl p-6 pb-2'>What&apos;s on in Bristol</h1>
        <div className='flex flex-col gap-2'>
          <div className='pl-6 flex gap-2'>
            <DateDropdown />
            <PriceDropdown />
          </div>
          <CategoryChips />
        </div>
      </form>
      <div className='p-6 pt-2'>
        <div className='flex justify-between'>
          <p className='secondary-text'>
            {filteredEvents.length > 0
              ? `${filteredEvents.length} events`
              : 'No events found'}
          </p>
          <button type='button' className='text-sm link' onClick={clearFilters}>
            Clear all filters
          </button>
        </div>
        <div className='grid gap-4 mt-5'>
          {filteredEvents.length > 0 &&
            filteredEvents.map((event) => (
              <EventCard
                key={event.name}
                horizontal
                size='sm'
                showSaved
                showTime
                event={event}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsOn;
