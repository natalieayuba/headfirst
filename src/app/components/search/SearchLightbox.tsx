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
import SearchResults from './SearchResults';
import useClickOutside from '@/hooks/useClickOutside';
import Input from '../Input';

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
  useClickOutside([inputRef, lightboxRef], closeLightbox);

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
          <Input
            type='search'
            icon='search'
            ref={inputRef}
            value={query}
            onChange={updateQuery}
            onBlur={closeSearch}
            placeholder='Search events and categories'
            autoFocus
            clearInput={() => setQuery('')}
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