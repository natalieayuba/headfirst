import React from 'react';
import Icon from '../Icon';
import useViewportHeight from '@/hooks/useViewportHeight';
import Link from '../Link';
import EventCard from '../EventCard';
import type { CategoryProps, EventProps, VenueProps } from '@/db/schema';

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
      className='my-4 bg-night rounded-lg search-content overflow-scroll overflow-x-auto transition-all duration-200'
      onMouseDown={(e) => e.preventDefault()}
      style={{
        maxHeight:
          isIos && (maxHeight as number) < 400
            ? `calc(${maxHeight}px - 150px)`
            : 400,
      }}
    >
      {searchResults.length === 0 ? (
        <p className='secondary-text'>No results found</p>
      ) : (
        <div className='flex flex-col p-2'>
          {searchResults.map((result) =>
            events.some((event) => result === event) ? (
              <EventCard
                key={result.name + result.id}
                event={result as EventProps}
                venue={venues.find(({ id }) => result.id === id) as VenueProps}
                onSelect={closeSearch}
                showPrice={false}
                showTime={false}
                showSaved={false}
                imageSize='h-14 w-14'
                animated={false}
                className='search-item'
                horizontal
                narrow
              />
            ) : (
              <Link
                key={result.name + result.id}
                href={`/whats-on?categoryId=${result.id}`}
                onSelect={closeSearch}
                className='flex gap-3 items-center search-item'
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
