'use client';
import { Button } from '@/app/components/buttons/Button';
import EventCard from '@/app/components/EventCard';
import Loader from '@/app/components/Loader';
import type { EventProps, VenueProps } from '@/db/schema';
import useLoader from '@/hooks/useLoader';
import useLocalStorage from '@/hooks/useLocalStorage';
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
  const [loadedEvents, setLoadedEvents] = useState<EventProps[]>([]);
  const maxLoadedEvents = 24;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { loading, loadPage } = useLoader();
  const { windowWidth } = useWindowWidth();
  const [savedEvents, updateSavedEvents] = useLocalStorage('savedEvents', []);

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

  useEffect(() => {
    if (filteredEvents.length > maxLoadedEvents) {
      setLoadedEvents(filteredEvents.slice(0, maxLoadedEvents));
    } else {
      setLoadedEvents(filteredEvents);
    }
  }, [filteredEvents]);

  const loadMore = () => {
    setLoadedEvents([
      ...loadedEvents,
      ...filteredEvents.slice(
        loadedEvents.length,
        loadedEvents.length + maxLoadedEvents
      ),
    ]);
  };

  return (
    <>
      {loading && <Loader />}
      <div className='content-container pt-2 mb-12 md:mb-24'>
        <div className='flex justify-between'>
          <p className='secondary-text'>
            {filteredEvents.length}
            {filteredEvents.length === 1 ? ' event' : ' events'}
          </p>
          {searchParams.size > 0 && (
            <button
              type='button'
              className='text-sm link disabled:opacity-30'
              onClick={() => loadPage(clearFilters)}
            >
              Clear all filters
            </button>
          )}
        </div>
        {loadedEvents.length > 0 ? (
          <div className='grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xs:gap-8 mt-5 xs:mt-6 mb-8'>
            {loadedEvents.map((event) => (
              <EventCard
                key={event.name}
                event={event}
                venues={venues}
                savedEvents={savedEvents}
                updateSavedEvents={updateSavedEvents}
                imageSize='w-24 xs:w-full'
                horizontal={windowWidth < 420}
              />
            ))}
          </div>
        ) : (
          <p className='mt-6 text-white text-opacity-60'>
            No events found. Please adjust your filters.
          </p>
        )}

        <div className='flex justify-center'>
          <Button
            alt
            onClick={loadMore}
            className={
              loadedEvents.length === filteredEvents.length ? 'hidden' : ''
            }
          >
            Load more
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilteredEvents;
