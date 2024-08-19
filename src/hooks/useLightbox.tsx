import { useEffect, useState } from 'react';

const useLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  return { isOpen, setIsOpen };
};

export default useLightbox;
