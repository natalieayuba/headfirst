'use client';
import Link from 'next/link';
import { useState } from 'react';
import { navLinks } from '../../../config';
import { Squash as Hamburger } from 'hamburger-react';

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
          size={24}
        />
      </div>
      <div
        className={`fixed bg-darkest-purple h-screen w-screen top-0 bottom-0 p-12 pt-40 right-0 transition-left duration-300 ${
          menuOpen ? 'left-0' : 'left-full'
        }`}
      >
        <ul className={`font-medium text-2xl flex flex-col gap-12 mb-12`}>
          {navLinks.map(({ name, url }) => (
            <li key={url}>
              <Link
                href={url}
                onClick={() => setMenuOpen(false)}
                className='transition-all duration-150'
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavMenu;
