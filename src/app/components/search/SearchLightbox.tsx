'use client';
import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Lightbox from '../Lightbox';
import useLightbox from '@/hooks/useLightbox';
import Icon from '../Icon';
import {
  type CategoryProps,
  type EventProps,
  type VenueProps,
} from '@/data/data';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export type SearchResults = (EventProps | CategoryProps)[];

interface SearchProps {
  categories: CategoryProps[];
  venues: VenueProps[];
  events: EventProps[];
}

const SearchLightbox = ({ categories, venues, events }: SearchProps) => {
  const { isOpen, closeLightbox, openLightbox, lightboxRef } = useLightbox();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clearInput = () => setQuery('');
  const updateQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const closeSearch = () => {
    closeLightbox();
    setSearchResults([]);
    setQuery('');
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setSearchResults(
        query === ''
          ? []
          : [...categories, ...events].filter(({ name }) =>
              name
                .toLowerCase()
                .split(' ')
                .some((word) => word.startsWith(query.toLowerCase()))
            )
      );
    }
  }, [query, categories, events]);

  return (
    <div className='flex'>
      <button onClick={openLightbox} className='pl-4'>
        <Icon name='search' />
      </button>
      {isOpen && (
        <Lightbox ref={lightboxRef} onClose={closeSearch}>
          <SearchBar
            ref={inputRef}
            query={query}
            updateQuery={updateQuery}
            closeSearch={closeSearch}
            clearInput={clearInput}
          />
          {query !== '' && (
            <SearchResults
              searchResults={searchResults}
              closeSearch={closeSearch}
              events={events}
              venues={venues}
            />
          )}
        </Lightbox>
      )}
    </div>
  );
};

export default SearchLightbox;
