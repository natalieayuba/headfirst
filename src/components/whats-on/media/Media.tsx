import React, { useState } from 'react';
import HorizontalScroll from '../../HorizontalScroll';
import type { MediaProps } from '@/data/data';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';

const Media = ({ media }: { media: MediaProps[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { isOpen, setIsOpen } = useLightbox();

  const handleClick = (medium: MediaProps) => {
    setIsOpen(true);
    setSelectedIndex(media.findIndex((m, index) => m === medium)!);
  };

  return (
    <div className='my-6'>
      <h2 className='px-6'>Media</h2>
      <HorizontalScroll
        list={media}
        card={(item) => (
          <MediaThumbnail medium={item} onClick={() => handleClick(item)} />
        )}
      />
      {isOpen && (
        <MediaLightbox
          media={media}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default Media;
