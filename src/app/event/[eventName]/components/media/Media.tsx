'use client';
import React, { useState } from 'react';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';
import type { EventProps, MediaProps } from '@/db/schema';
import Socials from '../Socials';
import MediaImage from './MediaImage';

const Media = ({ event }: { event: EventProps }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
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
    <div className='w-full md:flex-1 md:min-w-64 md:max-w-[400px] h-auto'>
      <MediaImage event={event} openLightbox={openLightbox} />
      <div className='hidden md:block'>
        {event.media.length > 1 && (
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
        )}
        {event.socials && <Socials socials={event.socials} />}
      </div>
    </div>
  );
};

export default Media;
