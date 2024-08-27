import Link from 'next/link';
import { MdExpandMore } from 'react-icons/md';
import { navLinks } from '../../../../config';

export interface NavLinksProps {
  url?: string;
  name: string;
}

const NavLinks = () => (
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

export default NavLinks;