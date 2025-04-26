'use client';
import Image from 'next/image';
import NavMenu from './NavMenu';
import React, { useState } from 'react';
import Link from 'next/link';
import { navLinks, utilities, type LinkProps } from '../../../../config';
import AnimatedLink from './AnimatedLink';
import useScrollY from '@/hooks/useScrollY';
import useDialog from '@/hooks/useDialog';
import Search from './Search';

const Header = () => {
  const scrollY = useScrollY();
  const { isOpen, toggleDialog } = useDialog();
  const [hovered, setHovered] = useState('');

  const renderAnimatedLinks = (
    links: Record<string, LinkProps>,
    svgClassName?: string
  ) =>
    Object.entries(links).map(([key, link]) => (
      <AnimatedLink
        key={link.text}
        {...{ ...link, svgClassName }}
        onMouseOver={() => setHovered(key)}
        onMouseOut={() => setHovered('')}
        hovered={key === hovered}
        {...(key === 'search' && { onClick: toggleDialog })}
      />
    ));

  return (
    <header
      className={`z-10 fixed w-full transition-all duration-200 ease-out bg-dark-night h-16 lg:h-20 justify-center flex ${scrollY < 100 ? 'bg-opacity-0' : ''}`}
    >
      <nav className='flex justify-between items-center size-full max-w-7xl px-6 lg:px-12'>
        <div className='flex gap-4 lg:gap-8 items-center h-full'>
          <Link
            href='/'
            className='w-20 relative h-full'
            title='Headfirst Bristol'
          >
            <Image
              src='/logo.svg'
              alt='Headfirst Bristol logo'
              width='0'
              height='0'
              className='absolute w-14 lg:w-16 transition-all duration-150 ease-in lg:hover:-rotate-3 lg:hover:scale-[120%] left-0 top-1/2 -translate-y-1/2'
            />
          </Link>
          {renderAnimatedLinks(navLinks)}
        </div>
        <div className='flex gap-4 lg:gap-8 items-center'>
          {renderAnimatedLinks(utilities, 'top-1/2 -translate-y-1/2')}
          <NavMenu />
        </div>
      </nav>
      {isOpen && <Search onClose={toggleDialog} />}
    </header>
  );
};

export default Header;
