import EventCard from '@/app/components/EventCard';
import {
  type CategoryProps,
  type EventProps,
  type VenueProps,
} from '@/data/data';
import Link from 'next/link';
import React from 'react';
import Icon from '../Icon';
import useViewportHeight from '@/hooks/useViewportHeight';

interface SearchResultsProps {
  events: EventProps[];
  venues: VenueProps[];
  searchResults: (EventProps | CategoryProps)[];
  closeSearch: () => void;
}

const SearchResults = ({
  events,
  venues,
  searchResults,
  closeSearch,
}: SearchResultsProps) => {
  const { maxHeight } = useViewportHeight();

  const isIos =
    typeof navigator !== 'undefined'
      ? navigator.userAgent.match(/ipad|ipod|iphone/i)
      : false;

  return (
    <div
      className='my-4 p-5 bg-night rounded-lg overflow-scroll transition-all duration-200'
      onMouseDown={(e) => e.preventDefault()}
      style={{ maxHeight: isIos ? `calc(${maxHeight}px - 150px)` : 450 }}
    >
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
                onClick={closeSearch}
                venues={venues}
              />
            ) : (
              <Link
                key={result.name + result.id}
                href={`/whats-on?categoryId=${result.id}`}
                onClick={closeSearch}
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
};

export default SearchResults;
