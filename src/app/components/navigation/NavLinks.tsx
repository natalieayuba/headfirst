import { navLinks } from '../../../../config';
import Link from '../Link';

const NavLinks = () => (
  <div className='hidden md:flex'>
    <ul className={`font-medium flex gap-10 items-center mt-1 mr-1`}>
      {navLinks.map(({ url, name }) => (
        <li key={name} className='flex items-center gap-0.5'>
          <Link href={url ?? '#'} className='default-hover'>
            {name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default NavLinks;
