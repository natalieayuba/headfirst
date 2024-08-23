'use client';
import React from 'react';
import Icon from '../Icon';
import { usePathname } from 'next/navigation';

const ShareButton = () => {
  return (
    <button>
      <Icon name='share' />
    </button>
  );
};

export default ShareButton;
