'use client';
import Link from 'next/link';
import { navLinks } from '../../../config';
import { MdExpandMore } from 'react-icons/md';

const NavLinks = () => {
  return (
    <div className='hidden lg:flex'>
      <ul className={`font-medium flex gap-10`}>
        {navLinks.map(({ url, name }) => (
          <li key={url} className={'relative'}>
            <Link href={url}>
              {name}
              {name === 'My account' ? (
                <MdExpandMore className='ml-1 inline' size={24} />
              ) : (
                ''
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavLinks;
