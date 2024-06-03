'use client';
import { useEffect, useState } from 'react';
import { headerHeight } from '../../config';
import NavLinks from './navigation/NavLinks';
import NavMenu from './navigation/NavMenu';
import SearchButton from './navigation/SearchButton';

const Header = () => {
  const [position, setPosition] = useState(
    typeof window !== 'undefined' && window.scrollY
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const moving = typeof window !== 'undefined' && window.scrollY;
      setVisible(position > moving);
      setPosition(moving);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header
      className='bg-darkest-purple bg-opacity-80 z-10 fixed w-full flex flex-col justify-between transition-all duration-300 ease-out margin-x-outer'
      style={{ height: headerHeight, top: visible ? 0 : `-${headerHeight}` }}
    >
      <nav className='flex justify-between h-full items-center transition-all duration-300 margin'>
        <a href='/' className='text-xl font-semibold tracking-widest'>
          BRIGHT
        </a>
        <div className='flex gap-2'>
          <SearchButton />
          <NavLinks />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
