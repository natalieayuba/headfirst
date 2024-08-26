import EventCard from '@/app/components/EventCard';
import { type CategoryProps, type EventProps } from '@/data/data';
import Link from 'next/link';
import React from 'react';
import Icon from '../Icon';

interface SearchResultsProps {
  events: EventProps[];
  searchResults: (EventProps | CategoryProps)[];
  close: () => void;
}

const SearchResults = ({
  events,
  searchResults,
  close,
}: SearchResultsProps) => (
  <div className='mt-4 p-5 bg-night rounded-lg overflow-scroll transition-all duration-200'>
    {searchResults.length === 0 ? (
      <p className='secondary-text'>No results found</p>
    ) : (
      <div className='flex flex-col gap-3'>
        {searchResults.map((result) =>
          events.some((event) => result === event) ? (
            <EventCard
              key={result.name + result.id}
              event={result as EventProps}
              horizontal
              size='xs'
              hidePrice
              onClick={close}
            />
          ) : (
            <Link
              key={result.name + result.id}
              href={`/whats-on?categoryId=${result.id}`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={close}
              className='flex gap-3 items-center'
            >
              <div className='w-14 flex justify-center'>
                <div className='p-3 bg-lilac bg-opacity-20 rounded-full'>
                  <Icon name='tag' size={18} />
                </div>
              </div>
              {result.name}
            </Link>
          )
        )}
      </div>
    )}
  </div>
);

export default SearchResults;
