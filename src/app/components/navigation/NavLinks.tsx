import { MdExpandMore } from 'react-icons/md';
import { navLinks } from '../../../../config';
import Link from '../Link';

const NavLinks = () => (
  <div className='hidden lg:flex'>
    <ul className={`font-medium flex gap-6 items-center mt-1 mr-1`}>
      {navLinks.map(({ url, name }) => (
        <li key={name} className='flex items-center gap-0.5'>
          <Link href={url ?? '#'}>{name}</Link>
          {name === 'My account' && (
            <MdExpandMore className='inline' size={20} />
          )}
        </li>
      ))}
    </ul>
  </div>
);

export default NavLinks;
