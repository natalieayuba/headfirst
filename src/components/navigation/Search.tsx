import React, { useState } from 'react';
import Lightbox from '../Lightbox';
import Icon from '../Icon';
import useLightbox from '@/hooks/useLightbox';

const Search = () => {
  const { isOpen, setIsOpen } = useLightbox();
  const [value, setValue] = useState('');

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
              type='search'
              placeholder='Search events and categories'
              className='bg-transparent flex-1 outline-none'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              autoFocus
            />
            {value && (
              <button
                onClick={() => setValue('')}
                className='pl-3 text-white-alpha-60 hover:opacity-85'
              >
                <Icon name='close' size={16} />
              </button>
            )}
          </div>
        </Lightbox>
      )}
    </div>
  );
};

export default Search;
