import React, { useEffect, useRef, useState, type UIEvent } from 'react';
import { isVideo } from './MediaThumbnail';
import Image from 'next/image';
import type { MediaProps } from '@/db/schema';
import SliderArrow from '@/app/components/SliderArrow';

interface MediaSwiperProps {
  media: MediaProps[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const MediaSwiper = ({
  media,
  selectedIndex,
  setSelectedIndex,
}: MediaSwiperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const margin = 24;
  const resolution = 16 / 9;
  const [scrollLeft, setScrollLeft] = useState(0);
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
  }, [media, resolution, selectedIndex]);

  const handleScroll = (e: UIEvent) => {
    const swiper = e.target as HTMLDivElement;
    if (
      swiper.scrollLeft === 0 ||
      swiper.scrollLeft % swiper.clientWidth === 0
    ) {
      setSelectedIndex(swiper.scrollLeft / swiper.clientWidth);
    }
    setScrollLeft(swiper.scrollLeft);
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
      className='-mx-6 flex flex-1 items-center snap-x snap-mandatory scroll-smooth overflow-x-scroll md:overflow-hidden'
      onScroll={handleScroll}
    >
      <div className='hidden md:flex w-[900px] left-1/2 -translate-x-1/2 justify-between absolute z-10 '>
        <SliderArrow direction='left' sliderRef={ref} scrollLeft={scrollLeft} />
        <SliderArrow
          direction='right'
          sliderRef={ref}
          scrollLeft={scrollLeft}
        />
      </div>
      {media.map((medium) => (
        <div
          key={medium.src}
          className='w-screen md:w-full h-full flex items-center p-6 md:p-12 snap-center'
        >
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
