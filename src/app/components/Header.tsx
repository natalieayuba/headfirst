'use client';
import Image from 'next/image';
import NavLinks from '@/app/components/navigation/NavLinks';
import NavMenu from '@/app/components/navigation/NavMenu';
import { usePathname } from 'next/navigation';
import Link from './Link';
import { useEffect, useState } from 'react';

const Header = ({ search }: { search: JSX.Element }) => {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => setScrollY(window.scrollY));
    return () =>
      window.removeEventListener('scroll', () => setScrollY(window.scrollY));
  });

  return (
    <header
      className={`z-10 fixed w-full flex flex-col justify-between top-0 transition-all duration-200 ease-out margin-x-outer bg-dark-night h-16 md:h-20 ${
        pathname === '/' && scrollY < 200 ? 'bg-opacity-0 ' : ''
      }`}
    >
      <nav className='flex justify-between h-full items-center transition-all duration-300 margin'>
        <Link href='/' className='h-full py-3'>
          <Image
            src='/logo.svg'
            alt='Headfirst Bristol logo'
            width='0'
            height='0'
            className='h-full w-auto'
          />
        </Link>
        <div className='flex'>
          <NavLinks />
          {search}
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
