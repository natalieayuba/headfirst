'use client';
import Link from 'next/link';
import { Squash as Hamburger } from 'hamburger-react';
import type { NavLinksProps } from './NavLinks';
import useLightbox from '@/hooks/useLightbox';
import { navLinks } from '../../../../config';
import Lightbox from '@/app/components/Lightbox';
import Divider from '@/app/components/Divider';

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
  const { isOpen, closeLightbox, openLightbox, lightboxRef } = useLightbox();

  const mainLinks = navLinks.filter(
    (link) => link !== navLinks[navLinks.length - 1]
  );

  const accountLinks = navLinks.find(({ name }) => name === 'My account')
    ?.links!;

  return (
    <div className='lg:hidden'>
      <Lightbox
        ref={lightboxRef}
        className={`transition-left duration-300 z-0 ${
          isOpen ? 'left-0' : 'left-full'
        }`}
      >
        <NavList links={mainLinks} close={closeLightbox} />
        <Divider className='w-14' />
        <h3 className='mb-2 text-white-alpha-60'>My account</h3>
        <NavList links={accountLinks} close={closeLightbox} />
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
          toggle={isOpen ? closeLightbox : openLightbox}
          size={18}
        />
      </div>
    </div>
  );
};

export default NavMenu;
