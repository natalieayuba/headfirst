import type { EventProps } from '@/db/schema';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import CTAButtons from '../CTAButtons';
import SliderDots from './SliderDots';
import Icon from '@/app/components/Icon';

interface MediaImageProps {
  event: EventProps;
  openLightbox: () => void;
}

const MediaImage = ({ event, openLightbox }: MediaImageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const mediaRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (
      mediaRef.current &&
      mediaRef.current.scrollLeft % mediaRef.current.clientWidth === 0
    ) {
      setCurrentIndex(
        mediaRef.current.scrollLeft / mediaRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.scrollTo({
        left: mediaRef.current.clientWidth * currentIndex,
        behavior: 'smooth',
      });
    }
  }, [currentIndex]);

  return (
    <div className='relative group'>
      <div
        ref={mediaRef}
        onScroll={handleScroll}
        className='rounded-lg w-full relative aspect-square flex overflow-x-scroll snap-x snap-mandatory hide-scrollbar mb-4'
      >
        {event.media.map((media) => (
          <div
            key={media.src}
            className='size-full flex-shrink-0 relative snap-center'
            onClick={openLightbox}
          >
            <Image
              src={media.src}
              alt={media.alt ?? event.name}
              fill
              sizes='100%'
              className='object-cover'
            />
          </div>
        ))}
      </div>
      <div></div>
      {/* {event.media.length > 1 && (
        <SliderDots
          media={event.media}
          currentIndex={currentIndex}
          updateCurrentIndex={(index) => setCurrentIndex(index)}
        />
      )} */}
      <CTAButtons eventId={event.id} />
      {/* <button
        className='opacity-0 transition-opacity duration-200 absolute group-hover:opacity-100 circle-button top-3 right-3'
        onClick={openLightbox}
      >
        <Icon name='expand' />
      </button> */}
    </div>
  );
};

export default MediaImage;
