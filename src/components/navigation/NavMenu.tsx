'use client';
import Link from 'next/link';
import { navLinks } from '../../../config';
import { Squash as Hamburger } from 'hamburger-react';
import Divider from '../Divider';
import type { NavLinksProps } from './NavLinks';
import Lightbox from '../Lightbox';
import useLightbox from '@/hooks/useLightbox';

const NavMenu = () => {
  const { isOpen, setIsOpen } = useLightbox();

  const list = (links: NavLinksProps[]) => (
    <ul className={`font-medium text-lg`}>
      {links.map(({ name, url }) => (
        <li key={name}>
          <Link
            href={url ?? '#'}
            className='block py-2 w-fit'
            onClick={() => setIsOpen(false)}
          >
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className='lg:hidden'>
      <Lightbox
        setIsOpen={setIsOpen}
        hideClose
        clickOutsideOff
        className={`transition-left duration-300 z-0 ${
          isOpen ? 'left-0' : 'left-full'
        }`}
      >
        {list(
          navLinks.filter(
            (link) => link !== navLinks[navLinks.length - 1]
          ) as NavLinksProps[]
        )}
        <Divider className='w-14' />
        <h3 className='mb-2 text-white-alpha-60'>My account</h3>
        {list(
          navLinks.find(({ name }) => name === 'My account')
            ?.links as NavLinksProps[]
        )}
      </Lightbox>
      <div
        className={`relative -mr-2 hover:scale-110 transition-all duration-150${
          isOpen ? ' z-20' : ''
        }`}
        title={`${isOpen ? 'Close' : 'Open'} menu`}
      >
        <Hamburger
          rounded
          toggled={isOpen}
          toggle={() => setIsOpen(!isOpen)}
          size={18}
        />
      </div>
    </div>
  );
};

export default NavMenu;
