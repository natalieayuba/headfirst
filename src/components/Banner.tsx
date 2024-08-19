'use client';
import React, { useEffect, useRef, useState } from 'react';
import { colors, description, tagline } from '../../config';
import Button from '@/components/Button';

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setVideoIndex(videoIndex === videos.length - 1 ? 0 : videoIndex + 1);
  //   }, 7500);
  //   return () => clearInterval(interval);
  // });

  useEffect(() => {
    if (videoRef.current?.readyState === 4) {
      videoRef.current.play();
      setPlaying(true);
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(transparent, ${colors['dark-night']})`,
      }}
      className={`h-svh w-full margin-x-outer relative`}
    >
      <video
        playsInline
        muted
        loop
        ref={videoRef}
        className={`object-cover absolute h-full -z-10 left-0  transition-opacity duration-500 ${
          playing ? 'opacity-100' : 'opacity-0'
        }
      `}
      >
        <source src='/banner-video.mp4' type='video/mp4' />
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
