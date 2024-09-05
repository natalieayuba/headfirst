'use client';
import React, { type ReactNode } from 'react';
import CookiesBanner from './components/CookiesBanner';
import useLocalStorage from '@/hooks/useLocalStorage';

const Template = ({ children }: { children: ReactNode }) => {
  const [showCookiesBanner, setShowCookiesBanner] = useLocalStorage(
    'showCookiesBanner',
    true
  );

  return (
    <>
      {children}
      {showCookiesBanner && (
        <CookiesBanner onClose={() => setShowCookiesBanner(false)} />
      )}
    </>
  );
};

export default Template;
