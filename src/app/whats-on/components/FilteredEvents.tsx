'use client';
import EventCard from '@/app/components/EventCard';
import Loader from '@/app/components/Loader';
import type { EventProps, VenueProps } from '@/db/schema';
import useLoader from '@/hooks/useLoader';
import useWindowWidth from '@/hooks/useWindowWidth';
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
  const { loading, loadPage } = useLoader();
  const { windowWidth } = useWindowWidth();

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams);
    for (const key of params.keys()) {
      params.delete(key);
    }
    router.replace(pathname);
  };

  useEffect(() => {
    setFilteredEvents(
      events.filter(
        ({ startDate, categoryId, tickets, subcategoryIds }) =>
          (!searchParams.has('date') ||
            formatDate(searchParams?.get('date')?.toString() as string) ===
              formatDate(startDate)) &&
          (!searchParams.has('priceFrom') ||
            tickets.some(
              ({ price }: { price: number }) =>
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
    <>
      {loading && <Loader />}
      <div className='content-container pt-2'>
        <div className='flex justify-between'>
          <p className='secondary-text'>
            {filteredEvents.length > 0
              ? `${filteredEvents.length} events`
              : 'No events found'}
          </p>
          <button
            type='button'
            className='text-sm link'
            onClick={() => {
              if (searchParams.size > 0) {
                loadPage(clearFilters);
              }
            }}
          >
            Clear all filters
          </button>
        </div>
        <div className='grid md:grid-cols-4 gap-4 md:gap-8 mt-5'>
          {filteredEvents.length > 0 &&
            filteredEvents.map((event) => (
              <EventCard
                key={event.name}
                event={event}
                venues={venues}
                cardSize=''
                imageSize='w-24 md:w-full'
                horizontal={windowWidth < 768}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default FilteredEvents;
