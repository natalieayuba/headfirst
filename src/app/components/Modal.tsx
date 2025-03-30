'use client';

import React, { type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';

interface ModalProps {
  children: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  contentMaxWidth?: number;
}

const Modal = ({ children, onBack, onClose, contentMaxWidth }: ModalProps) => {
  const modalRoot = document.getElementById('modal-root');

  const modal = (
    <div className='fixed z-20 bg-dark-night backdrop-blur-sm bg-opacity-95 size-full'>
      <div
        {...(contentMaxWidth && { style: { maxWidth: contentMaxWidth } })}
        className='w-full px-6 md:px-12'
      >
        <div className='flex justify-between h-16 md:h-20'>
          {onBack && (
            <button onClick={onBack} className='default-hover' title='back'>
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
        </div>
        {children}
      </div>
    </div>
  );

  return modalRoot ? createPortal(modal, modalRoot) : null;
};

export default Modal;
