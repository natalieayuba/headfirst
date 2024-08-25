import React, {
  useEffect,
  useRef,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Lightbox from '../../Lightbox';
import type { MediaProps } from '@/data/data';
import HorizontalScroll from '../../HorizontalScroll';
import MediaThumbnail from './MediaThumbnail';
import MediaSwiper from './MediaSwiper';

interface MediaLightboxProps {
  media: MediaProps[];
  selectedIndex: number;
  setSelectedIndex: Dispatch<SetStateAction<number>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MediaLightbox = ({
  media,
  selectedIndex,
  setSelectedIndex,
  setIsOpen,
}: MediaLightboxProps) => {
  const scrollerRef = useRef<HTMLOListElement>(null);
  const thumbnailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (thumbnailRef.current && scrollerRef.current) {
      const rect = thumbnailRef.current.getBoundingClientRect();
      console.log(rect.left);
      if (rect.right > window.innerWidth) {
        scrollerRef.current.scroll(rect.right - window.innerWidth + 16, 0);
      }
      if (rect.left < 0) {
        scrollerRef.current.scroll(rect.left - 16, 0);
      }
    }
  }, [selectedIndex]);

  return (
    <Lightbox setIsOpen={setIsOpen}>
      <div className='flex flex-col h-full gap-4 justify-between '>
        <p className='text-center'>
          {selectedIndex + 1}
          {' of '}
          {media.length}
        </p>
        <MediaSwiper
          onSwipe={(index) => setSelectedIndex(index)}
          media={media}
          selectedIndex={selectedIndex}
        />
        <p className='text-center mt-4'>{media[selectedIndex]?.alt}</p>
        <HorizontalScroll
          ref={scrollerRef}
          className='-mx-6'
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
                  ? 'outline outline-2 outline-lilac'
                  : 'opacity-50'
              }
            />
          )}
        />
      </div>
    </Lightbox>
  );
};

export default MediaLightbox;
