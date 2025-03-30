'use client';
import Icon from '../Icon';
import Link from 'next/link';
import { navLinks, utilities } from '../../../../config';
import useDialog from '@/hooks/useDialog';
import Dialog from '../Dialog';

const NavMenu = () => {
  const { isOpen, toggleDialog, dialogRef } = useDialog();
  const links = [
    ...Object.values(navLinks),
    ...Object.values(utilities).slice(1, Object.values(utilities).length - 1),
  ];

  return (
    <div className='flex md:hidden'>
      <button onClick={toggleDialog}>
        <Icon name='menu' />
      </button>
      {isOpen && (
        <Dialog ref={dialogRef} onClose={toggleDialog}>
          <ul>
            {links.map(({ text, url }) => (
              <li key={text}>
                <Link
                  href={url ?? '#'}
                  className='h-14 flex items-center text-xl'
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </Dialog>
      )}
    </div>
  );
};

export default NavMenu;
