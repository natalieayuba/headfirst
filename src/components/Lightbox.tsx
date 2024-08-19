import { appendClassName } from '@/utils/formatting';
import React, {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import Icon from './Icon';

interface LightboxProps {
  children: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
  hideClose?: boolean;
}

const Lightbox = ({
  children,
  setIsOpen,
  className,
  hideClose,
}: LightboxProps) => {
  return (
    <div
      className={`fixed flex flex-col z-20 bg-dark-night bg-opacity-95 h-screen w-screen top-0 bottom-0 right-0${appendClassName(
        className
      )}`}
    >
      <header className='flex justify-between h-16 px-6'>
        {!hideClose && (
          <button onClick={() => setIsOpen(false)} className='ml-auto'>
            <Icon name='close' />
          </button>
        )}
      </header>
      <div className='p-6'>{children}</div>
    </div>
  );
};

export default Lightbox;
