import { useEffect, useState } from 'react';

const useLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.cssText = 'touch-action:none';
    }
  }, [isOpen]);

  return { isOpen, setIsOpen };
};

export default useLightbox;
