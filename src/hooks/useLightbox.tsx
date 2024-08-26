import { useEffect, useState } from 'react';

const useLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    document.body.style.touchAction = isOpen ? 'none' : 'auto';
  }, [isOpen]);

  return { isOpen, open, close, toggle };
};

export default useLightbox;
