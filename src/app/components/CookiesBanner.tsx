'use client';
import React from 'react';
import HyperLink from './Hyperlink';
import Button, { type ButtonBaseProps } from './buttons/Button';
import useLocalStorage from '@/hooks/useLocalStorage';
import Modal from './Modal';

const buttons = [
  {
    text: 'Accept all',
  },
  {
    text: 'Reject all',
    type: 'secondary',
  },
  {
    text: 'Customise',
    type: 'secondary',
  },
];

interface CookiesBannerProps {
  onClose: () => void;
}

const CookiesBanner = ({ onClose }: CookiesBannerProps) => (
  <Modal>
    <div
      className='z-10 fixed w-full bg-night p-6 md:px-12 flex justify-between items-center flex-wrap gap-x-8 gap-y-4 animate-maskIn bottom-0'
      style={{ animationDelay: '300ms', animationDuration: '300ms' }}
    >
      <div className='md:flex-1'>
        <p className='text-2xl'>About cookies on this site</p>
        <p className='text-white text-opacity-60'>
          Headfirst uses cookies to improve your user experience. Learn more in
          our <HyperLink href='#'>Privacy Policy</HyperLink>.
        </p>
      </div>
      <div className='flex flex-col gap-4 flex-1 md:flex-row md:flex-none'>
        {buttons.map(({ text, type = 'primary' }) => (
          <Button
            key={text}
            onClick={onClose}
            type={type as ButtonBaseProps['type']}
            className='w-full block'
            animate={false}
          >
            {text}
          </Button>
        ))}
      </div>
    </div>
  </Modal>
);

export default CookiesBanner;
