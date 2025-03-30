'use client';
import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import SearchResults from '../SearchResults';
import type { CategoryProps, EventProps } from '@/db/schema';
import Input from '../../Input';
import Dialog from '../../Dialog';
import { getCategories, getEvents } from '@/db/queries';

export type SearchResults = (EventProps | CategoryProps)[];

interface SearchLightboxProps {
  toggleDialog: () => void;
}

const SearchLightbox = ({ toggleDialog }: SearchLightboxProps) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const events = await getEvents();
      const categories = await getCategories();
      const searchResults = [...categories, ...events].filter(({ name }) =>
        name
          .toLowerCase()
          .split(' ')
          .some((word) => word.startsWith(query.toLowerCase()))
      );
      setSearchResults(searchResults);
    };
    query === '' ? setSearchResults([]) : fetchSearchResults();
  }, [query]);

  const updateQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  return (
    <Dialog onClose={toggleDialog}>
      <Input
        id='search'
        type='search'
        icon='search'
        ref={inputRef}
        value={query}
        onChange={updateQuery}
        onBlur={toggleDialog}
        placeholder='Search events and categories'
        clearInput={() => setQuery('')}
        autoFocus
      />
      <SearchResults {...{ searchResults }} />
    </Dialog>
  );
};

export default SearchLightbox;
