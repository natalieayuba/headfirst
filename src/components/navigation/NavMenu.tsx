'use client';
import Link from 'next/link';
import { navLinks } from '../../../config';
import { Squash as Hamburger } from 'hamburger-react';
import Divider from '../Divider';
import type { NavLinksProps } from './NavLinks';
import Lightbox from '../Lightbox';
import useLightbox from '@/hooks/useLightbox';

interface NavListProps {
  links: NavLinksProps[];
  close: () => void;
}

const NavList = ({ links, close }: NavListProps) => (
  <ul className={`font-medium text-lg`}>
    {links.map(({ name, url }) => (
      <li key={name}>
        <Link href={url ?? '#'} className='block py-2 w-fit' onClick={close}>
          {name}
        </Link>
      </li>
    ))}
  </ul>
);

const NavMenu = () => {
  const { isOpen, close, toggle } = useLightbox();

  const mainLinks = navLinks.filter(
    (link) => link !== navLinks[navLinks.length - 1]
  );
  const accountLinks = navLinks.find(({ name }) => name === 'My account')
    ?.links!;

  return (
    <div className='lg:hidden'>
      <Lightbox
        hideClose
        clickOutsideOff
        className={`transition-left duration-300 z-0 ${
          isOpen ? 'left-0' : 'left-full'
        }`}
      >
        <NavList links={mainLinks} close={close} />
        <Divider className='w-14' />
        <h3 className='mb-2 text-white-alpha-60'>My account</h3>
        <NavList links={accountLinks} close={close} />
      </Lightbox>
      <div
        className={`relative -mr-2 hover:scale-110 transition-all duration-150${
          isOpen ? ' z-20' : ''
        }`}
        title={`${isOpen ? 'Close' : 'Open'} menu`}
      >
        <Hamburger rounded toggled={isOpen} toggle={toggle} size={18} />
      </div>
    </div>
  );
};

export default NavMenu;
