'use client';
import React, { useState } from 'react';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import type { MediaProps } from '@/data/data';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';

const Media = ({ media }: { media: MediaProps[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { isOpen, openLightbox, closeLightbox, lightboxRef } = useLightbox();

  const openMediaLightbox = (medium: MediaProps) => {
    setSelectedIndex(media.findIndex((m, index) => m === medium)!);
    openLightbox();
  };

  const closeMediaLightbox = () => {
    setSelectedIndex(-1);
    closeLightbox();
  };

  return (
    <div className='mb-8'>
      <h2 className='px-6 mb-4'>Media</h2>
      <HorizontalScroll
        list={media}
        card={(medium) => (
          <MediaThumbnail
            medium={medium}
            onClick={() => openMediaLightbox(medium)}
          />
        )}
      />
      {isOpen && (
        <MediaLightbox
          media={media}
          onClose={closeMediaLightbox}
          ref={lightboxRef}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </div>
  );
};

export default Media;
