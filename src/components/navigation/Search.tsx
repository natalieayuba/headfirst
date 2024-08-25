import React, { useEffect, useRef, useState, type ChangeEvent } from 'react';
import Lightbox from '../Lightbox';
import Icon from '../Icon';
import useLightbox from '@/hooks/useLightbox';
import {
  categories,
  events,
  type CategoryProps,
  type EventProps,
} from '@/data/data';
import EventCard from '../EventCard';
import Link from 'next/link';

const Search = () => {
  const { isOpen, setIsOpen } = useLightbox();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    (EventProps | CategoryProps)[]
  >([]);
  const inputRef = useRef<HTMLInputElement>(null);

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
      <button onClick={() => setIsOpen(true)} className='pl-4'>
        <Icon name='search' />
      </button>
      {isOpen && (
        <Lightbox setIsOpen={setIsOpen}>
          <div className='bg-night rounded-md border border-20 flex h-12 items-center px-4'>
            <Icon name='search' className='w-4 mr-3' />
            <input
              ref={inputRef}
              type='search'
              placeholder='Search events and categories'
              className='bg-transparent flex-1 outline-none'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className='pl-3 text-white-alpha-60 hover:opacity-85'
              >
                <Icon name='close' size={16} />
              </button>
            )}
          </div>
          {query !== '' && (
            <div className='mt-4 max-h-dvh p-5 bg-night rounded-lg shadow-md overflow-scroll'>
              {searchResults.length === 0 ? (
                <p className='secondary-text'>No results found</p>
              ) : (
                <div className='flex flex-col gap-3'>
                  {searchResults.map((result) =>
                    events.some((event) => result === event) ? (
                      <EventCard
                        key={result.id}
                        event={result as EventProps}
                        onClick={() => setIsOpen(false)}
                        horizontal
                        size='xs'
                        hidePrice
                      />
                    ) : (
                      <Link
                        key={result.id}
                        href={`whats-on?categoryId${result.id}`}
                        className='flex gap-3 items-center'
                        onClick={() => setIsOpen(false)}
                      >
                        <div className='w-14 flex justify-center'>
                          <div className='p-3 bg-white bg-opacity-20 rounded-full'>
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
          )}
        </Lightbox>
      )}
    </div>
  );
};

export default Search;
