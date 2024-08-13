'use client';
import React, { useEffect, useState } from 'react';
import { colors, description, tagline, videos } from '../../config';
import Button from '@/components/Button';

const Banner = () => {
  const [videoIndex, setVideoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
    }, 7500);
    return () => clearInterval(interval);
  });

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(transparent, ${colors['darkest-purple']})`,
      }}
      className={`h-svh w-full margin-x-outer relative`}
    >
      <video
        autoPlay
        muted
        playsInline
        key={videos[videoIndex]}
        className='object-cover absolute h-full -z-10 left-0 grayscale'
      >
        <source src={videos[videoIndex]} type='video/mp4' />
      </video>
      <div className='flex flex-col h-full pb-10 justify-end items-start lg:max-w-3xl'>
        <h1 className='heading-lg'>{tagline}</h1>
        <p className='text-md lg:text-2xl my-1'>{description}</p>
        <Button className='mt-5'>Browse events</Button>
      </div>
    </div>
  );
};

export default Banner;
