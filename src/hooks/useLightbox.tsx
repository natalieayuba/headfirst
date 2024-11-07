import { useEffect, useRef, useState } from 'react';

const useLightbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const lightboxRef = useRef<HTMLDivElement>(null);

  const openLightbox = () => setIsOpen(true);
  const closeLightbox = () => setIsOpen(false);

  useEffect(() => {
    document.body.style.overflowY = isOpen ? 'hidden' : 'auto';
    document.body.style.touchAction = isOpen ? 'none' : 'auto';
    document
      .querySelectorAll('video')
      .forEach((video) => (isOpen ? video.pause() : video.play()));
  }, [isOpen]);

  return { isOpen, openLightbox, closeLightbox, lightboxRef };
};

export default useLightbox;
