'use client';
import React, { useState, type ReactNode } from 'react';
import CookiesBanner from './components/CookiesBanner';

const Template = ({ children }: { children: ReactNode }) => {
  const [showCookiesBanner, setShowCookiesBanner] = useState(
    Boolean(localStorage.getItem('showCookiesBanner')) ?? true
  );

  const handleClose = () => {
    setShowCookiesBanner(false);
    localStorage.setItem('showCookiesBanner', 'false');
  };

  return (
    <>
      {children}
      {showCookiesBanner && <CookiesBanner onClose={handleClose} />}
    </>
  );
};

export default Template;
