'use client';
import Image from 'next/image';
import NavLinks from '@/app/components/navigation/NavLinks';
import NavMenu from '@/app/components/navigation/NavMenu';
import { usePathname } from 'next/navigation';
import Link from './Link';
import { useEffect, useState } from 'react';

const Header = ({ search }: { search: JSX.Element }) => {
  const pathname = usePathname();
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
      className={`z-10 fixed w-full flex flex-col justify-between transition-all duration-200 ease-out px-4 md:px-12 bg-dark-night h-16 md:h-20 ${
        pathname === '/' && prevScrollY < 300 ? 'bg-opacity-0 ' : ''
      } ${visible ? 'top-0' : '-top-16 md:-top-20'}`}
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
