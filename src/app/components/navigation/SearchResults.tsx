import React, { useEffect, useState } from 'react';
import useViewportHeight from '@/hooks/useViewportHeight';
import type { CategoryProps, EventProps, VenueProps } from '@/db/schema';
import Link from 'next/link';
import EventCard from '../EventCard';
import Icon from '../Icon';
import { getVenues } from '@/db/queries';

export type SearchResult = {
  type: string;
} & (EventProps | CategoryProps);

interface SearchResultsProps {
  searchResults: SearchResult[];
  closeSearch?: () => void;
}

const SearchResults = ({ searchResults, closeSearch }: SearchResultsProps) => {
  const [venues, setVenues] = useState<VenueProps[]>([]);
  const { maxHeight } = useViewportHeight();

  useEffect(() => {
    const fetchVenues = async () => {
      const venues = await getVenues();
      setVenues(venues);
    };
    fetchVenues();
  }, []);

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
        <p className='secondary-text p-4'>No results found</p>
      ) : (
        venues && (
          <div className='flex flex-col p-2'>
            {searchResults.map((result) =>
              result.type === 'event' ? (
                <EventCard
                  key={result.name + result.id}
                  event={result as EventProps}
                  venue={
                    (venues.find(({ id }) => result.id === id) as VenueProps) ||
                    ''
                  }
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
        )
      )}
    </div>
  );
};

export default SearchResults;
