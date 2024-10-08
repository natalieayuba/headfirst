import React from 'react';
import { colors, description, tagline } from '../../../../config';
import { ButtonLink } from '@/app/components/buttons/Button';

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
      className={`min-h-[500px] h-svh md:h-[1080px] w-full px-4 md:px-12 relative`}
    >
      <video
        playsInline
        muted
        autoPlay
        loop
        className='animate-fadeIn object-cover absolute h-full w-full -z-10 left-0 -mt-1 saturate-50 contrast-150 brightness-110'
      >
        <source src='/banner-video.mp4' type='video/mp4' />
      </video>
      <div className='flex flex-col h-full pb-10 justify-end items-start lg:max-w-3xl relative'>
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
        <p className='text-md lg:text-2xl md:max-w-[500px] my-1'>
          {description}
        </p>
        <ButtonLink className='mt-5' href='/whats-on'>
          Browse events
        </ButtonLink>
      </div>
    </div>
  );
};

export default Banner;
