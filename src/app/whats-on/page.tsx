'use client';
import React, { useEffect, useState } from 'react';
import { categories, events } from '@/data/data';
import DateDropdown from '@/components/filters/DateDropdown';
import EventCard from '@/components/EventCard';
import { formatDate } from '@/utils/formatting';
import Link from 'next/link';
import PriceDropdown from '@/components/filters/PriceDropdown';
import CategoryChips from '@/components/filters/CategoryChips';

export interface FilterProps {
  filter: (name: string, value: any) => void;
}

interface FiltersProps {
  date?: string;
  price?: number[];
  category?: string;
  subcategory?: string;
}

const WhatsOn = () => {
  const [filters, setFilters] = useState<FiltersProps>({});
  const [filteredEvents, setFilteredEvents] = useState(events);

  const filter = (name: string, value: any) => {
    setFilters((filters) => ({ ...filters, [name]: value }));
  };

  useEffect(() => {
    if (filters.category === '') {
      delete filters.category;
    }
    if (filters.subcategory === '') {
      delete filters.subcategory;
    }
    setFilteredEvents(
      events.filter(({ startDate, categoryId, tickets, subcategoryIds }) => {
        console.log(
          categories[categoryId].subcategories.findIndex(
            (subcategory) => subcategory === filters.subcategory
          )
        );
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
          (!filters.category ||
            filters.category === categories[categoryId].name) &&
          (!filters.subcategory ||
            subcategoryIds.includes(
              categories[categoryId].subcategories.findIndex(
                (subcategory) => subcategory === filters.subcategory
              )
            ))
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
            <DateDropdown filter={filter} />
            <PriceDropdown filter={filter} />
          </div>
          <CategoryChips filter={filter} />
        </div>
      </form>
      <div className='p-6 pt-2'>
        <div className='flex justify-between'>
          <p className='secondary-text'>
            {filteredEvents.length > 0
              ? `${filteredEvents.length} events`
              : 'No events found'}
          </p>
          <Link
            className='text-sm link'
            href='/whats-on'
            onClick={() => window.location.reload()}
          >
            Clear filters
          </Link>
        </div>
        <div className='grid gap-4 mt-4'>
          {filteredEvents.length > 0 &&
            filteredEvents.map((event) => (
              <EventCard key={event.name} horizontal showTime event={event} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default WhatsOn;
