import React from 'react';
import { colors, description, tagline } from '../../../../config';
import Button from '@/app/components/buttons/Button';

const Banner = () => {
  const lines = () => {
    const words = `${tagline}.`.split(' ');
    const lines = [];
    const numLines = 3,
      numWords = 2;
    for (let i = 0; i < numLines; i++) {
      lines.push(words.splice(0, numWords).join(' '));
    }
    return lines;
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(transparent -30%, ${colors['dark-night']})`,
      }}
      className={`min-h-[500px] h-svh md:h-[1080px] w-full container-mx pb-8 relative`}
    >
      <video
        playsInline
        muted
        autoPlay
        loop
        className='animate-fadeIn object-cover absolute h-full -z-10 left-0 -mt-1 saturate-50 contrast-150 brightness-110'
      >
        <source src='/banner-video.mp4' type='video/mp4' />
      </video>
      <div className='flex flex-col h-full justify-end items-start lg:max-w-3xl relative'>
        <h1 className='heading-lg'>
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
        <p className='text-md lg:text-2xl max-w-sm'>{description}</p>
        <Button className='mt-6' href='/whats-on'>
          Find an event
        </Button>
      </div>
    </div>
  );
};

export default Banner;
