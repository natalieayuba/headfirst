'use client';
import Image from 'next/image';
import NavMenu from '@/app/components/navigation/NavMenu';
import { usePathname } from 'next/navigation';
import Link from './Link';
import { useEffect, useState } from 'react';
import React from 'react';
import Icon from './Icon';

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

  const navLinks = {
    browse: [
      {
        text: "What's on",
        url: '/whats-on',
      },
      {
        text: 'Venues',
      },
    ],
    user: [
      {
        text: 'Ticket your event',
      },
      {
        text: 'My account',
        links: [],
      },
    ],
  };

  return (
    <header
      className={`z-10 fixed w-full transition-all duration-200 ease-out container-mx bg-dark-night h-16 md:h-20 ${
        pathname === '/' && prevScrollY < 30 ? ' bg-opacity-0 ' : ''
      } 
        ${visible ? 'top-0' : '-top-16 md:-top-20'}`}
    >
      <nav className='flex justify-between items-center size-full'>
        <div className='flex gap-6 md:gap-8 items-center'>
          <NavMenu />
          <Link href='/'>
            <Image
              src='/logo.svg'
              alt='Headfirst Bristol logo'
              width='0'
              height='0'
              className='w-14 md:w-16'
            />
          </Link>
          {navLinks.browse.map(({ text, url }) => (
            <Link
              key={text}
              href={url ?? '#'}
              className='hidden md:block font-medium'
            >
              {text}
            </Link>
          ))}
        </div>
        <div className='flex gap-4 md:gap-8 items-center'>
          {search}
          <Icon name='user' className='md:hidden' />
          {navLinks.user.map(({ text, links }) => (
            <Link key={text} href='#' className='hidden md:block font-medium'>
              {text}
              {links && (
                <Icon name='angle-down' size={16} className='inline ml-1' />
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
