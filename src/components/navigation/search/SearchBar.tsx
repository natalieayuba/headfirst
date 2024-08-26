import Icon from '@/components/Icon';
import React, { forwardRef, type ChangeEvent } from 'react';

interface SearchBarProps {
  query: string;
  close: () => void;
  update: (e: ChangeEvent<HTMLInputElement>) => void;
  clear: () => void;
}

const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ query, update, close, clear }, ref) => (
    <div className='bg-night rounded-md border border-20 flex h-12 items-center px-4'>
      <Icon name='search' className='w-4 mr-3' />
      <input
        ref={ref}
        type='search'
        placeholder='Search events and categories'
        className='bg-transparent flex-1 outline-none'
        value={query}
        onChange={update}
        onBlur={close}
        autoFocus
      />
      {query && (
        <button
          onClick={clear}
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
