import type { MediaProps } from '@/data/data';
import React, { forwardRef } from 'react';
import Image from 'next/image';
import { appendClassName } from '@/utils/formatting';
import Icon from '@/app/components/Icon';

interface ThumbnailProps {
  medium: MediaProps;
  onClick: () => void;
  className?: string;
}

export const getYoutubeThumbnail = (url: string) => {
  const id = url.match(/youtube\.com.*(\?v=|\/embed\/)(.{11})/)?.pop();
  return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
};

export const isVideo = (medium: MediaProps) =>
  medium.src.includes('youtube.com');

const MediaThumbnail = forwardRef<HTMLDivElement, ThumbnailProps>(
  ({ medium, onClick, className }, ref) => (
    <div
      ref={ref}
      className={`aspect-square w-24 rounded-lg overflow-hidden relative${appendClassName(
        className
      )}`}
      onClick={onClick}
    >
      <Image
        src={isVideo(medium) ? getYoutubeThumbnail(medium.src) : medium.src}
        alt={medium.alt}
        fill
        sizes='100%'
        className='object-cover'
      />
      {isVideo(medium) && (
        <div className='absolute bg-dark-night bg-opacity-60 h-full w-full flex items-center justify-center'>
          <Icon name='play' />
        </div>
      )}
    </div>
  )
);

MediaThumbnail.displayName = 'MediaThumbnail';

export default MediaThumbnail;