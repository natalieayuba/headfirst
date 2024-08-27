'use client';
import { useEffect, useState } from 'react';

const useHeaderVisibility = () => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setVisible(prevScrollY > scrollY || prevScrollY < 0);
      setPrevScrollY(scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return { visible };
};

export default useHeaderVisibility;
