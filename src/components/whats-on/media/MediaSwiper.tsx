import React, { useEffect, useRef, useState, type UIEvent } from 'react';
import { isVideo } from './MediaThumbnail';
import Image from 'next/image';
import type { MediaProps } from '@/data/data';

interface MediaSwiperProps {
  media: MediaProps[];
  selectedIndex: number;
  onSwipe: (index: number) => void;
}

const MediaSwiper = ({ onSwipe, media, selectedIndex }: MediaSwiperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const margin = 24;
  const resolution = 16 / 9;
  const snapDistance = 50;
  const [videoSize, setVideoSize] = useState([
    window.innerWidth - margin * 2,
    window.innerWidth / resolution,
  ]);

  useEffect(() => {
    if (isVideo(media[selectedIndex]!)) {
      const updateSize = () =>
        setVideoSize([
          window.innerWidth - margin * 2,
          window.innerWidth / resolution,
        ]);
      window.addEventListener('resize', updateSize);
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  const handleScroll = (e: UIEvent) => {
    const swiper = e.target as HTMLDivElement;
    if (
      swiper.scrollLeft === 0 ||
      swiper.scrollLeft % swiper.clientWidth === 0
    ) {
      onSwipe(swiper.scrollLeft / swiper.clientWidth);
    }
  };

  useEffect(() => {
    if (ref.current) {
      if (selectedIndex * ref.current.clientWidth !== ref.current.scrollLeft) {
        ref.current.scroll(selectedIndex * ref.current.clientWidth, 0);
      }
    }
  }, [selectedIndex]);

  return (
    <div
      ref={ref}
      className='-mx-6 flex flex-1 items-center snap-x snap-mandatory overflow-x-scroll'
      onScroll={handleScroll}
    >
      {media.map((medium) => (
        <div className='w-screen h-full flex items-center p-6 snap-center'>
          {isVideo(medium) ? (
            <iframe
              src={medium.src.replace('/watch?v=', '/embed/')}
              allowFullScreen
              width={videoSize[0]}
              height={videoSize[1]}
              title={medium.alt}
            />
          ) : (
            <div className='w-screen h-full relative'>
              <Image
                src={medium.src!}
                alt={medium.alt!}
                width={0}
                height={0}
                sizes='100vw'
                fill
                className='object-contain'
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MediaSwiper;
