'use client';
import React, { useState } from 'react';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';
import type { EventProps, MediaProps } from '@/db/schema';

const Media = ({ event }: { event: EventProps }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { isOpen, openLightbox, closeLightbox, lightboxRef } = useLightbox();

  const openMediaLightbox = (medium: MediaProps) => {
    setSelectedIndex(event.media.findIndex((m) => m === medium)!);
    openLightbox();
  };

  const closeMediaLightbox = () => {
    setSelectedIndex(-1);
    closeLightbox();
  };

  return (
    <div className='mt-6 mb-4'>
      <HorizontalScroll
        list={event.media.slice(1)}
        className='px-0 grid grid-flow-col grid-cols-4'
        renderItem={(medium) => (
          <MediaThumbnail
            event={event}
            medium={medium}
            className='w-full'
            onClick={() => openMediaLightbox(medium)}
          />
        )}
      />
      {isOpen && (
        <MediaLightbox
          event={event}
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
