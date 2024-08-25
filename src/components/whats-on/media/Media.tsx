import React, { useState } from 'react';
import HorizontalScroll from '../../HorizontalScroll';
import type { MediaProps } from '@/data/data';
import useLightbox from '@/hooks/useLightbox';
import MediaLightbox from './MediaLightbox';
import MediaThumbnail from './MediaThumbnail';

const Media = ({ media }: { media: MediaProps[] }) => {
  const [selectedMedium, setSelectedMedium] = useState<MediaProps | null>(null);
  const { isOpen, setIsOpen } = useLightbox();

  const handleClick = (medium: MediaProps) => {
    setIsOpen(true);
    setSelectedMedium(medium);
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
          selectedMedium={selectedMedium}
          setSelectedMedium={setSelectedMedium}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
};

export default Media;
