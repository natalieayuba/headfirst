import { appendClassName } from '@/utils/formatting';
import React, {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import Icon from './Icon';

interface LightboxProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(
  ({ children, className, onClose }, ref) => (
    <div
      className={`fixed z-20 bg-dark-night backdrop-blur-sm bg-opacity-95 max-h-full h-screen w-screen overflow-y-auto left-0 top-0 ${appendClassName(
        className
      )}`}
    >
      <nav className='flex justify-between h-16 px-6'>
        {onClose && (
          <button onClick={onClose} className='ml-auto'>
            <Icon name='close' />
          </button>
        )}
      </nav>
      <div className='px-6 pb-6' ref={ref}>
        {children}
      </div>
    </div>
  )
);

Lightbox.displayName = 'Lightbox';

export default Lightbox;
