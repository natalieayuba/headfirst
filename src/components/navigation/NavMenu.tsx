'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { navLinks } from '../../../config';
import { Squash as Hamburger } from 'hamburger-react';

const NavMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
        className={`fixed bg-darkest-purple h-screen w-screen top-0 bottom-0 right-0 transition-left duration-300 ${
          menuOpen ? 'left-0' : 'left-full'
        }`}
      >
        <ul className={`font-medium text-xl h-full flex flex-col mt-32`}>
          {navLinks.map(({ name, url }) => (
            <li key={url} className='w-full'>
              <Link
                href={url}
                onClick={() => setMenuOpen(false)}
                className='block py-4 px-6'
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
