'use client';
import Link from 'next/link';
import { navLinks } from '../../../config';
import { MdExpandMore } from 'react-icons/md';

export interface NavLinksProps {
  url?: string;
  name: string;
}

const NavLinks = () => {
  return (
    <div className='hidden lg:flex'>
      <ul className={`font-medium flex gap-10`}>
        {navLinks.map(({ url, name }) => (
          <li key={name} className={'relative'}>
            {url ? (
              <Link href={url}>{name}</Link>
            ) : (
              <button>
                {name}
                <MdExpandMore className='ml-1 inline' size={24} />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
