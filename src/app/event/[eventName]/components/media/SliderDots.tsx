import type { MediaProps } from '@/db/schema';
import React from 'react';

interface SliderDotsProps {
  media: MediaProps[];
  currentIndex: number;
  updateCurrentIndex: (index: number) => void;
}

const SliderDots = ({
  media,
  currentIndex,
  updateCurrentIndex,
}: SliderDotsProps) => (
  <div className='absolute bottom-3 flex gap-2 w-full justify-center items-center'>
    {media.map((media, index) => (
      <button
        key={media.src}
        onClick={() => updateCurrentIndex(index)}
        className={`size-2.5 rounded-full transition-all duration-150 ${
          index === currentIndex ? 'bg-lilac' : 'bg-night'
        }`}
      ></button>
    ))}
  </div>
);

export default SliderDots;
