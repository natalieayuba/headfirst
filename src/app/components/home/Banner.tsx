import React from 'react';
import { colors, description, tagline } from '../../../../config';
import Button from '@/app/components/buttons/Button';

const Banner = () => {
  const lines = () => {
    const words = tagline.split(' ');
    const lines = [];
    const numLines = 3,
      numWords = 2;
    for (let i = 0; i < numLines; i++) {
      lines.push(words.splice(0, numWords).join(' '));
    }
    return lines;
  };

  return (
    <div className='h-svh max-h-[1080px] overflow-hidden relative flex pt-24'>
      <video
        playsInline
        muted
        autoPlay
        loop
        className='animate-fadeIn object-cover absolute size-full inset-0 saturate-50 -z-10 contrast-150 brightness-[60%]'
        style={{
          maskImage: 'url(/ripped-paper-texture.png)',
          maskRepeat: 'no-repeat',
          WebkitMaskImage: 'url(/ripped-paper-texture.png)',
          backgroundColor: colors['dark-night'],
          maskSize: 'cover',
          maskPosition: '0  bottom',
          backgroundImage: `linear-gradient(transparent -30%, ${colors['dark-night']})`,
        }}
      >
        {/* TODO Pause video during open modals or when not visible */}
        <source src='/banner-video.mp4' type='video/mp4' />
      </video>
      <div className='max-w-7xl w-full px-6 md:px-12 m-auto mb-20 md:mb-52'>
        <h1 className='heading-lg text-white text-opacity-95'>
          {lines().map((line, index) => (
            <span key={line} className='overflow-hidden block'>
              <span
                className='bg-purple block animate-maskIn'
                style={{
                  animationDelay: `${150 * index}ms`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className='text-md lg:text-2xl mt-3 md:mt-6 max-w-lg text-white text-opacity-90'>
          {description}
        </p>
        <Button className='mt-6 md:mt-10' href='/whats-on'>
          Find an event
        </Button>
      </div>
    </div>
  );
};

export default Banner;
