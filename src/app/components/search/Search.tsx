import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Lightbox from '../Lightbox';
import Icon from '../Icon';
import useLightbox from '@/hooks/useLightbox';
import { type CategoryProps, type EventProps } from '@/data/data';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { getCategories, getEvents } from '@/data/utils';

export type SearchResults = (EventProps | CategoryProps)[];

const Search = () => {
  const { isOpen, close, open } = useLightbox();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const [events, setEvents] = useState<EventProps[]>([]);
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const clear = () => setQuery('');
  const update = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  useEffect(() => {
    const fetchData = async () => {
      setCategories(await getCategories());
      setEvents(await getEvents());
    };
    fetchData();
  }, []);

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
            <SearchResults
              searchResults={searchResults}
              close={close}
              events={events}
            />
          )}
        </Lightbox>
      )}
    </div>
  );
};

export default Search;
