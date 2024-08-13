import React from 'react';
import { MdSearch } from 'react-icons/md';

const SearchButton = () => {
  return (
    <button className='z-10'>
      <MdSearch size={24} />
    </button>
  );
};

export default SearchButton;
