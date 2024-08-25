import React, {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import Lightbox from '../../Lightbox';
import type { MediaProps } from '@/data/data';
import HorizontalScroll from '../../HorizontalScroll';
import MediaThumbnail, { isVideo } from './MediaThumbnail';
import Image from 'next/image';

interface MediaLightboxProps {
  media: MediaProps[];
  selectedMedium: MediaProps | null;
  setSelectedMedium: Dispatch<SetStateAction<MediaProps | null>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const MediaLightbox = ({
  media,
  selectedMedium,
  setSelectedMedium,
  setIsOpen,
}: MediaLightboxProps) => {
  const margin = 24;
  const resolution = 16 / 9;

  const [videoSize, setVideoSize] = useState([
    window.innerWidth - margin * 2,
    window.innerWidth / resolution,
  ]);

  useEffect(() => {
    if (isVideo(selectedMedium!)) {
      const updateSize = () =>
        setVideoSize([
          window.innerWidth - margin * 2,
          window.innerWidth / resolution,
        ]);
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }
  }, []);

  return (
    <Lightbox setIsOpen={setIsOpen}>
      <div className='flex flex-col h-full gap-4 justify-between '>
        <p className='text-center'>
          {media.findIndex((medium) => medium === selectedMedium) + 1}
          {' of '}
          {media.length}
        </p>
        <div className='flex-1 flex flex-col'>
          <div className='flex-1 relative flex items-center'>
            {isVideo(selectedMedium!) ? (
              <iframe
                src={selectedMedium?.src.replace('/watch?v=', '/embed/')}
                allowFullScreen
                width={videoSize[0]}
                height={videoSize[1]}
                title={selectedMedium?.alt}
              />
            ) : (
              <Image
                src={selectedMedium?.src!}
                alt={selectedMedium?.alt!}
                width={0}
                height={0}
                sizes='100vw'
                fill
                className='object-contain'
              />
            )}
          </div>
          <p className='text-center mt-4'>{selectedMedium?.alt}</p>
        </div>
        <HorizontalScroll
          className='-mx-6'
          list={media}
          card={(item) => (
            <MediaThumbnail
              medium={item}
              onClick={() => setSelectedMedium(item)}
              className={
                item === selectedMedium
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
