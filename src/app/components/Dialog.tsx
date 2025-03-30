import React, { forwardRef, type ReactNode } from 'react';
import Icon from './Icon';

interface DialogProps {
  children: ReactNode;
  onClose?: () => void;
  contentMaxWidth?: number;
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ children, onClose, contentMaxWidth }) => (
    <div className='fixed z-20 bg-dark-night backdrop-blur-sm bg-opacity-95 size-full flex justify-center inset-0'>
      <div
        {...(contentMaxWidth && { style: { maxWidth: contentMaxWidth } })}
        className='w-full px-6'
      >
        {onClose && (
          <div className='flex justify-between h-16 md:h-20'>
            {onClose && (
              <button
                onClick={onClose}
                className='ml-auto default-hover'
                title='Close'
              >
                <Icon name='close' />
              </button>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
);

Dialog.displayName = 'Dialog';

export default Dialog;
