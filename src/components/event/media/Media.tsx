import React, { useState } from 'react';
import HorizontalScroll from '../../HorizontalScroll';
import type { MediaProps } from '@/data/data';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';

const Media = ({ media }: { media: MediaProps[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const { isOpen, open } = useLightbox();

  const handleClick = (medium: MediaProps) => {
    open();
    setSelectedIndex(media.findIndex((m, index) => m === medium)!);
  };

  return (
    <div className='my-6'>
      <h2 className='px-6'>Media</h2>
      <HorizontalScroll
        list={media}
        card={(medium) => (
          <MediaThumbnail medium={medium} onClick={() => handleClick(medium)} />
        )}
      />
      {isOpen && (
        <MediaLightbox
          media={media}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
        />
      )}
    </div>
  );
};

export default Media;
