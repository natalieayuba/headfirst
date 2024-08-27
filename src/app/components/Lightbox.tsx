import { appendClassName } from '@/utils/formatting';
import React, { forwardRef, useState, type ReactNode } from 'react';
import Icon from './Icon';

interface LightboxProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(
  ({ children, className, onClose }, ref) => {
    const isIos =
      typeof navigator !== 'undefined'
        ? navigator.userAgent.match(/ipad|ipod|iphone/i)
        : false;

    return (
      <div
        className={`fixed flex flex-col z-20 bg-dark-night backdrop-blur-sm bg-opacity-95 h-dvh w-screen top-0 bottom-0 right-0${appendClassName(
          className
        )}`}
        // style={{
        //   maxHeight: isIos ? `${maxHeight}px` : '450px',
        // }}
      >
        <header className='flex justify-between h-16 px-6'>
          {onClose && (
            <button onClick={onClose} className='ml-auto'>
              <Icon name='close' />
            </button>
          )}
        </header>
        <div className='px-6' ref={ref}>
          {children}
        </div>
      </div>
    );
  }
);

Lightbox.displayName = 'Lightbox';

export default Lightbox;
