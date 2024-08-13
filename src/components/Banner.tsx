'use client';
import React from 'react';
import { colors, images } from '../../config';
import Image from 'next/image';
import Button from '@/components/Button';

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(transparent, ${colors['darkest-purple']})`,
      }}
      className={`h-svh w-full margin-x-outer relative`}
    >
      <Image
        src={images.banner}
        className='-z-[1] grayscale object-cover'
        alt='Hero image'
        fill
        sizes='100vw'
      />
      <div className='flex flex-col h-full pb-10 justify-end items-start lg:max-w-3xl'>
        <h1 className='heading-lg'>Find the Bristol scene that fits.</h1>
        <p className='text-md lg:text-2xl my-1'>
          Discover local gigs, clubnights, and social events from Bristol&apos;s
          biggest promoters.
        </p>
        <Button className='mt-5'>Browse events</Button>
      </div>
    </div>
  );
};

export default Banner;
