'use client';
import EventCard from '@/app/components/EventCard';
import type { EventProps, VenueProps } from '@/data/data';
import { formatDate } from '@/utils/formatting';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface FilteredEventsProps {
  events: EventProps[];
  venues: VenueProps[];
}

const FilteredEvents = ({ events, venues }: FilteredEventsProps) => {
  const [filteredEvents, setFilteredEvents] = useState(events);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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
  }, [searchParams, events]);

  return (
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
              venues={venues}
              horizontal
              size='sm'
              showSaved
              showTime
              event={event}
            />
          ))}
      </div>
    </div>
  );
};

export default FilteredEvents;
