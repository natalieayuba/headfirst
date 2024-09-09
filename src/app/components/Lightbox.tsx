import { appendClassName } from '@/utils/formatting';
import React, { forwardRef, type ReactNode } from 'react';
import Icon from './Icon';

interface LightboxProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
  onBack?: () => void;
  maxWidth?: string;
}

const Lightbox = forwardRef<HTMLDivElement, LightboxProps>(
  ({ children, className, onClose, onBack, maxWidth }, ref) => (
    <div
      className={`fixed z-20 bg-dark-night backdrop-blur-sm bg-opacity-95 max-h-full h-screen w-screen overflow-y-auto left-0 top-0 ${appendClassName(
        className
      )}`}
    >
      <nav className='flex justify-between h-12 md:h-16 px-4'>
        {onBack && (
          <button onClick={onBack}>
            <Icon name='angle-left' />
          </button>
        )}
        {onClose && (
          <button
            onClick={onClose}
            className='ml-auto default-hover'
            title='Close'
          >
            <Icon name='close' />
          </button>
        )}
      </nav>
      <div
        className={`px-4 mb-6 md:mx-auto${appendClassName(maxWidth)}`}
        ref={ref}
      >
        {children}
      </div>
    </div>
  )
);

Lightbox.displayName = 'Lightbox';

export default Lightbox;
