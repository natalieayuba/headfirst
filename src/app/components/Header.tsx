'use client';
import Image from 'next/image';
import NavLinks from '@/app/components/navigation/NavLinks';
import NavMenu from '@/app/components/navigation/NavMenu';
import useHeaderVisibility from '@/hooks/useHeaderVisibility';
import { usePathname } from 'next/navigation';
import Link from './Link';

const Header = ({ search }: { search: JSX.Element }) => {
  const pathname = usePathname();
  const { visible } = useHeaderVisibility();

  return (
    <header
      className={`z-10 fixed w-full flex flex-col justify-between transition-all duration-200 ease-out margin-x-outer bg-dark-night h-16 ${
        pathname === '/' &&
        typeof window !== 'undefined' &&
        window.scrollY < 300
          ? 'bg-opacity-0 '
          : ''
      } ${visible ? 'top-0' : '-top-16'}`}
    >
      <nav className='flex justify-between h-full items-center transition-all duration-300 margin'>
        <Link href='/' className='h-full py-3'>
          <Image
            src='/logo.svg'
            alt='Headfirst Bristol logo'
            width='0'
            height='0'
            className='h-full w-auto'
          />
        </Link>
        <div className='flex'>
          {search}
          <NavLinks />
          <NavMenu />
        </div>
      </nav>
    </header>
  );
};

export default Header;
