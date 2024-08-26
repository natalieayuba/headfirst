import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Lightbox from '../../Lightbox';
import Icon from '../../Icon';
import useLightbox from '@/hooks/useLightbox';
import {
  categories,
  events,
  type CategoryProps,
  type EventProps,
} from '@/data/data';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

export type SearchResults = (EventProps | CategoryProps)[];

const Search = () => {
  const { isOpen, close, open } = useLightbox();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => setQuery('');
  const update = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

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
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setSearchResults([]);
      setQuery('');
    }
  }, [isOpen]);

  return (
    <div className='flex'>
      <button onClick={open} className='pl-4'>
        <Icon name='search' />
      </button>
      {isOpen && (
        <Lightbox>
          <SearchBar
            ref={inputRef}
            query={query}
            update={update}
            clear={clear}
            close={close}
          />
          {query !== '' && (
            <SearchResults searchResults={searchResults} close={close} />
          )}
        </Lightbox>
      )}
    </div>
  );
};

export default Search;
