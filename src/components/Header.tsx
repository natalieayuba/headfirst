'use client';
import { useEffect, useState } from 'react';
import NavLinks from './navigation/NavLinks';
import NavMenu from './navigation/NavMenu';
import SearchButton from './navigation/SearchButton';
import Image from 'next/image';

const Header = () => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(prevScrollY > scrollY || prevScrollY < 0);
      setPrevScrollY(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <header
      className={`z-10 fixed w-full flex flex-col justify-between transition-all duration-300 ease-out margin-x-outer bg-dark-night ${
        prevScrollY < 100 ? 'h-20' : 'h-16'
      } ${prevScrollY < 200 ? 'bg-opacity-0' : ''} ${
        visible ? 'top-0' : '-top-16'
      }`}
    >
      <nav className='flex justify-between h-full items-center transition-all duration-300 margin'>
        <a href='/' className='h-full py-3'>
          <Image
            src='/logo.svg'
            alt='Headfirst Bristol logo'
            width='0'
            height='0'
            className='h-full w-auto'
          />
        </a>
        <div className='flex'>
          <SearchButton />
          <NavLinks />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
