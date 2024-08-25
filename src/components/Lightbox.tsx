import { appendClassName } from '@/utils/formatting';
import React, {
  useEffect,
  useRef,
  type CSSProperties,
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
  clickOutsideOff?: boolean;
}

const Lightbox = ({
  children,
  setIsOpen,
  className,
  hideClose,
  clickOutsideOff,
}: LightboxProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !clickOutsideOff &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, setIsOpen, clickOutsideOff]);

  return (
    <div
      className={`fixed flex flex-col z-20 bg-dark-night backdrop-blur-sm bg-opacity-95 h-dvh w-screen top-0 bottom-0 right-0${appendClassName(
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
      <div className='px-6' ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Lightbox;
