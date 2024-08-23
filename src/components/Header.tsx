'use client';
import { useEffect, useState } from 'react';
import NavLinks from './navigation/NavLinks';
import NavMenu from './navigation/NavMenu';
import Search from './navigation/Search';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();

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
      className={`z-10 fixed w-full flex flex-col justify-between transition-all duration-200 ease-out margin-x-outer bg-dark-night h-16 ${
        pathname === '/' && window.scrollY < 300 ? 'bg-opacity-0' : ''
      } ${visible ? 'top-0' : '-top-16'}`}
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
          <Search />
          <NavLinks />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
