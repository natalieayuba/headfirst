'use client';
import React, { useState } from 'react';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';
import type { MediaProps } from '@/db/schema';

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
    <div className='mt-8 md:mt-12'>
      <h2 className='mb-4'>Media</h2>
      <HorizontalScroll
        list={media}
        className='-ml-6 md:-ml-12'
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
