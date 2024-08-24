'use client';
import React, { useEffect, useState } from 'react';
import { events } from '@/data/data';
import DateDropdown from '@/components/filters/DateDropdown';
import EventCard from '@/components/EventCard';
import { formatDate } from '@/utils/formatting';
import PriceDropdown from '@/components/filters/PriceDropdown';
import CategoryChips from '@/components/filters/CategoryChips';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface AddFilterProps {
  addFilter: (name: string, value: any) => void;
  clear: boolean;
}

interface FiltersProps {
  date?: string;
  price?: number[];
  categoryId?: string;
  subcategoryId?: string;
}

const WhatsOn = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FiltersProps>({});
  const [filteredEvents, setFilteredEvents] = useState(events);
  const [clear, setClear] = useState(false);

  const addFilter = (name: string, value: any) => {
    setFilters((filters) => ({ ...filters, [name]: value }));
  };

  const clearFilters = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    for (const key of Object.keys(filters)) {
      params.delete(key);
    }
    setClear(true);
    router.replace(pathname);
    setFilters({});
  };

  useEffect(() => {
    setClear(false);
    for (const key of Object.keys(filters)) {
      if (!(filters as any)[key]) {
        delete (filters as any)[key];
      }
    }

    const params = new URLSearchParams(filters as Record<string, string>);
    params.forEach((value, key) => {
      if (value === '') {
        params.delete(key);
      }
    });

    const query = params.toString() ? `?${params.toString()}` : '';
    console.log(filters);
    router.push(`${pathname}${query}`);

    setFilteredEvents(
      events.filter(({ startDate, categoryId, tickets, subcategoryIds }) => {
        return (
          (!filters.date ||
            formatDate(filters.date) === formatDate(startDate)) &&
          (!filters.price ||
            tickets.some(
              ({ price }) =>
                filters.price &&
                price >= filters.price[0] &&
                price <= filters.price[1]
            )) &&
          (!filters.categoryId || filters.categoryId === categoryId) &&
          (!filters.subcategoryId ||
            subcategoryIds.includes(filters.subcategoryId))
        );
      })
    );
  }, [filters]);

  return (
    <div className='mt-16'>
      <form>
        <h1 className='text-4xl p-6 pb-2'>What&apos;s on in Bristol</h1>
        <div className='flex flex-col gap-2'>
          <div className='pl-6 flex gap-2'>
            <DateDropdown addFilter={addFilter} clear={clear} />
            <PriceDropdown addFilter={addFilter} clear={clear} />
          </div>
          <CategoryChips addFilter={addFilter} clear={clear} />
        </div>
      </form>
      <div className='p-6 pt-2'>
        <div className='flex justify-between'>
          <p className='secondary-text'>
            {filteredEvents.length > 0
              ? `${filteredEvents.length} events`
              : 'No events found'}
          </p>
          <button className='text-sm link' onClick={clearFilters}>
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
