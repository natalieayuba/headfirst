'use client';
import React, { useEffect, useState } from 'react';
import {
  animationDurations,
  colors,
  description,
  tagline,
  videos,
} from '../../config';
import Button from '@/components/Button';

const Banner = () => {
  const [videoIndex, setVideoIndex] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex(videoIndex === videos.length - 1 ? 0 : videoIndex + 1);
    }, 7500);
    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(transparent, ${colors['dark-night']})`,
      }}
      className='h-svh w-full margin-x-outer relative animate-fadeIn'
    >
      <video
        autoPlay
        muted
        playsInline
        key={videos[videoIndex]}
        className='object-cover absolute h-full -z-10 left-0 grayscale -top-1'
      >
        <source src={videos[videoIndex]} type='video/mp4' />
      </video>
      <div className='flex flex-col h-full pb-10 justify-end items-start lg:max-w-3xl'>
        <h1 className='heading-lg'>
          {lines().map((line, index) => (
            <span key={line} className='overflow-hidden inline-block'>
              <span
                className='bg-purple block animate-maskIn'
                style={{
                  animationDelay: `${100 * index}ms`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>
        <p className='text-md lg:text-2xl my-1'>{description}</p>
        <Button className='mt-5'>Browse events</Button>
      </div>
    </div>
  );
};

export default Banner;
