import React, { forwardRef, useEffect, useRef } from 'react';
import Lightbox from '../../../../components/Lightbox';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import MediaThumbnail from './MediaThumbnail';
import MediaSwiper from './MediaSwiper';
import type { EventProps } from '@/db/schema';

interface MediaLightboxProps {
  event: EventProps;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onClose: () => void;
}

const MediaLightbox = forwardRef<HTMLDivElement, MediaLightboxProps>(
  ({ event, selectedIndex, setSelectedIndex, onClose }, lightboxRef) => {
    const scrollerRef = useRef<HTMLOListElement>(null);
    const thumbnailRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (thumbnailRef.current && scrollerRef.current) {
        const rect = thumbnailRef.current.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          scrollerRef.current.scroll(rect.right - window.innerWidth + 16, 0);
        }
        if (rect.left < 0) {
          scrollerRef.current.scroll(rect.left - 16, 0);
        }
      }
    }, [selectedIndex]);

    return (
      <Lightbox
        onClose={onClose}
        ref={lightboxRef}
        className='overflow-y-hidden'
        maxWidth='md:max-w-[800px]'
      >
        <div
          className='flex flex-col h-full gap-4 justify-between overflow-hidden'
          style={{ height: 'calc(100dvh - 80px)' }}
        >
          <p className='text-center'>
            {selectedIndex + 1}
            {' of '}
            {event.media.length}
          </p>
          <MediaSwiper
            media={event.media}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <p className='text-center mb-12'>{event.media[selectedIndex]?.alt}</p>
          <HorizontalScroll
            ref={scrollerRef}
            className='px-12 w-screen scroll-smooth justify-center mb-6 md:mb-12'
            list={event.media}
            card={(item) => (
              <MediaThumbnail
                event={event}
                ref={
                  event.media.findIndex((medium) => medium === item) ===
                  selectedIndex
                    ? thumbnailRef
                    : null
                }
                medium={item}
                onClick={() =>
                  setSelectedIndex(
                    event.media.findIndex((medium) => medium === item)
                  )
                }
                className={
                  item === event.media[selectedIndex]
                    ? 'border-2 border-lilac'
                    : 'opacity-50'
                }
              />
            )}
          />
        </div>
      </Lightbox>
    );
  }
);
MediaLightbox.displayName = 'MediaLightbox';

export default MediaLightbox;
