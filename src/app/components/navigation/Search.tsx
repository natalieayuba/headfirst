import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Dialog from '../Dialog';
import Input from '../Input';
import { getCategories, getEvents } from '@/db/queries';
import type { CategoryProps, EventProps } from '@/db/schema';
import SearchResults, { type SearchResult } from './SearchResults';

interface SearchProps {
  onClose: () => void;
}

const Search = ({ onClose }: SearchProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const updateQuery = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const getSearchResultType = (
    item: EventProps | CategoryProps,
    type: string
  ) => ({
    ...item,
    type,
  });

  // TODO search shows no results while loading
  // TODO some venues aren't shown
  // TODO scrollbar not working in search - firefox

  useEffect(() => {
    const fetchSearchResults = async () => {
      const events = (await getEvents()).map((item) =>
        getSearchResultType(item, 'event')
      );
      const categories = (await getCategories()).map((item) =>
        getSearchResultType(item, 'category')
      );
      const searchResults = [...categories, ...events].filter(({ name }) =>
        name
          .toLowerCase()
          .split(' ')
          .some((word) => word.startsWith(query.toLowerCase()))
      );
      setSearchResults(searchResults);
    };
    if (query) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <Dialog {...{ onClose }} contentMaxWidth={500}>
      <Input
        id='search'
        type='search'
        icon='search'
        ref={inputRef}
        value={query}
        onChange={updateQuery}
        onBlur={onClose}
        placeholder='Search events and categories'
        clearInput={() => setQuery('')}
        autoFocus
      />
      {query && <SearchResults {...{ searchResults }} closeSearch={onClose} />}
    </Dialog>
  );
};

export default Search;
