'use client';
import useLightbox from '@/hooks/useLightbox';
import Lightbox from '@/app/components/Lightbox';
import Link from './Link';
import Icon from './Icon';

const NavMenu = () => {
  const { isOpen, closeLightbox, openLightbox, lightboxRef } = useLightbox();
  const links = [
    {
      text: 'Browse events',
      url: '/whats-on',
      sublinks: [
        { text: 'Live music', url: '/whats-on?categoryId=0' },
        { text: 'Club nights', url: '/whats-on?categoryId=1' },
        { text: 'Arts', url: '/whats-on?categoryId=2' },
        { text: 'Socials', url: '/whats-on?categoryId=3' },
      ],
    },
    { text: 'Venues' },
  ];

  return (
    <div className='flex'>
      <button onClick={isOpen ? closeLightbox : openLightbox}>
        <Icon name='menu' />
      </button>
      {isOpen && (
        <Lightbox ref={lightboxRef} onClose={closeLightbox}>
          <ul onClick={closeLightbox}>
            {links.map(({ text, url, sublinks }) => (
              <li key={text}>
                <Link href={url ?? '#'} className='h-10 flex items-center'>
                  {text}
                </Link>
                {sublinks && (
                  <ul className='ml-4'>
                    {sublinks.map(({ text, url }) => (
                      <li key={text}>
                        <Link href={url} className='h-10 flex items-center'>
                          {text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Lightbox>
      )}
    </div>
  );
};

export default NavMenu;
