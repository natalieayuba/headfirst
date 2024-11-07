'use client';
import useLightbox from '@/hooks/useLightbox';
import Lightbox from '@/app/components/Lightbox';
import Divider from '@/app/components/Divider';
import Link from '../Link';
import Icon from '../Icon';

interface NavListProps {
  links: any[];
  close: () => void;
}

const NavMenu = () => {
  const { isOpen, closeLightbox, openLightbox, lightboxRef } = useLightbox();

  const NavList = ({ links, close }: NavListProps) => (
    <ul className={`font-medium text-lg`}>
      {links.map(({ name, url }) => (
        <li key={name}>
          <Link href={url ?? '#'} className='block py-2 w-fit' onSelect={close}>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className='md:hidden'>
      <Lightbox
        ref={lightboxRef}
        className={`transition-left duration-300 z-0 ${
          isOpen ? 'left-0' : 'left-[110%]'
        }`}
      >
        <Divider className='w-14' />
        <h3 className='mb-2 text-white text-opacity-60'>My account</h3>
      </Lightbox>
      <button
        type='button'
        className={`relative -mr-2 default-hover${isOpen ? ' z-20' : ''}`}
        title={`${isOpen ? 'Close' : 'Open'} menu`}
        onClick={() => (isOpen ? closeLightbox : openLightbox)}
      >
        <Icon name='menu' />
        {/* <Hamburger
          rounded
          toggled={isOpen}
          toggle={isOpen ? closeLightbox : openLightbox}
          size={18}
        /> */}
      </button>
    </div>
  );
};

export default NavMenu;
