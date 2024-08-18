'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks } from '../../../config';
import { Squash as Hamburger } from 'hamburger-react';
import Divider from '../Divider';
import type { NavLinksProps } from './NavLinks';

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const list = (links: NavLinksProps[]) => (
    <ul className={`font-medium text-lg flex flex-col`}>
      {links.map(({ name, url }) => (
        <li key={name} className='w-full'>
          <Link
            href={url ?? '#'}
            onClick={() => setMenuOpen(false)}
            className='block py-2'
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
  }, [menuOpen]);

  return (
    <div className='lg:hidden'>
      <div
        className='z-10 relative -mr-2 hover:scale-110 transition-all duration-150'
        title={`${menuOpen ? 'Close' : 'Open'} menu`}
      >
        <Hamburger
          rounded
          toggled={menuOpen}
          toggle={() => setMenuOpen(!menuOpen)}
          size={18}
        />
      </div>
      <div
        className={`fixed flex flex-col bg-dark-night h-screen w-screen top-0 bottom-0 right-0 pt-20 px-6 transition-left duration-300 ${
          menuOpen ? 'left-0' : 'left-full'
        }`}
      >
        {list(
          navLinks.filter(
            (link) => link !== navLinks[navLinks.length - 1]
          ) as NavLinksProps[]
        )}
        <Divider width='w-14 ' />
        <h3 className='mb-2 text-white-alpha-60'>My account</h3>
        {list(
          navLinks.find(({ name }) => name === 'My account')
            ?.links as NavLinksProps[]
        )}
      </div>
    </div>
  );
};

export default NavMenu;
