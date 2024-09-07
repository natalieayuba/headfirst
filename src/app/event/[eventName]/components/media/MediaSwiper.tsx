import React, { useEffect, useState, type RefObject } from 'react';
import { isVideo } from './MediaThumbnail';
import Image from 'next/image';
import type { MediaProps } from '@/db/schema';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';

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
  const { sliderRef, handleScroll, SliderArrowLeft, SliderArrowRight } =
    useHorizontalScroll();
  const margin = 24;
  const resolution = 16 / 9;
  const [videoSize, setVideoSize] = useState<number[]>([]);

  useEffect(() => {
    if (isVideo(media[selectedIndex]!) && sliderRef.current) {
      const swiperContainer = sliderRef.current.children[1] as HTMLElement;
      const updateSize = () =>
        setVideoSize([
          swiperContainer.clientWidth - margin * 2,
          (swiperContainer.clientWidth - margin * 2) / resolution,
        ]);
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }
  });

  const scroll = () => {
    handleScroll();
    if (
      sliderRef.current &&
      (sliderRef.current.scrollLeft === 0 ||
        sliderRef.current.scrollLeft % sliderRef.current.clientWidth === 0)
    ) {
      setSelectedIndex(
        sliderRef.current.scrollLeft / sliderRef.current.clientWidth
      );
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      if (
        selectedIndex * sliderRef.current.clientWidth !==
        sliderRef.current.scrollLeft
      ) {
        sliderRef.current.scroll(
          selectedIndex * sliderRef.current.clientWidth,
          0
        );
      }
    }
  }, [selectedIndex]);

  return (
    <div
      ref={sliderRef as RefObject<HTMLDivElement>}
      className='-mx-6 flex flex-1 items-center snap-x snap-mandatory overflow-x-scroll md:overflow-hidden'
      onScroll={scroll}
    >
      {media.map((medium) => (
        <div
          key={medium.src}
          className='w-screen md:w-full h-full flex items-center p-6 md:p-12 snap-center z-10'
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
      <div className='hidden md:flex w-[900px] left-1/2 -translate-x-1/2 justify-between absolute'>
        {SliderArrowLeft}
        {SliderArrowRight}
      </div>
    </div>
  );
};

export default MediaSwiper;
