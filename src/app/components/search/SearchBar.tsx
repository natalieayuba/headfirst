import React, { forwardRef, type ChangeEvent } from 'react';
import Icon from '../Icon';

interface SearchBarProps {
  query: string;
  closeSearch: () => void;
  updateQuery: (e: ChangeEvent<HTMLInputElement>) => void;
  clearInput: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ query, updateQuery, closeSearch, clearInput }, ref) => (
    <div
      className='bg-night rounded-md border border-20 flex h-12 items-center px-4'
      onMouseDown={(e) => e.preventDefault()}
    >
      <Icon name='search' className='w-4 mr-3' />
      <input
        ref={ref}
        type='search'
        placeholder='Search events and categories'
        className='bg-transparent flex-1 outline-none'
        value={query}
        onChange={updateQuery}
        // onBlur={closeSearch}
        autoFocus
      />
      {query && (
        <button
          onClick={clearInput}
          onMouseDown={(e) => e.preventDefault()}
          className='pl-3 text-white-alpha-60 hover:opacity-85'
        >
          <Icon name='close' size={16} />
        </button>
      )}
    </div>
  )
);

SearchBar.displayName = 'SearchBar';

export default SearchBar;
