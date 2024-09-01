import React, { forwardRef, useEffect, useRef } from 'react';
import Lightbox from '../../../../components/Lightbox';
import HorizontalScroll from '../../../../components/HorizontalScroll';
import MediaThumbnail from './MediaThumbnail';
import MediaSwiper from './MediaSwiper';
import type { MediaProps } from '@/db/schema';

interface MediaLightboxProps {
  media: MediaProps[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  onClose: () => void;
}

const MediaLightbox = forwardRef<HTMLDivElement, MediaLightboxProps>(
  ({ media, selectedIndex, setSelectedIndex, onClose }, lightboxRef) => {
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
            {media.length}
          </p>
          <MediaSwiper
            media={media}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
          <p className='text-center mb-12'>{media[selectedIndex]?.alt}</p>
          <HorizontalScroll
            ref={scrollerRef}
            className='scroll-smooth justify-center mb-6 md:mb-12'
            list={media}
            card={(item) => (
              <MediaThumbnail
                ref={
                  media.findIndex((medium) => medium === item) === selectedIndex
                    ? thumbnailRef
                    : null
                }
                medium={item}
                onClick={() =>
                  setSelectedIndex(media.findIndex((medium) => medium === item))
                }
                className={
                  item === media[selectedIndex]
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
