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
      className={`h-screen w-full margin-x-outer relative`}
    >
      <Image
        src={images.banner}
        className='-z-[1] grayscale'
        alt='Party gorl'
        objectFit='cover'
        fill
      />
      <div className='flex flex-col h-full py-[14%] justify-end items-start lg:max-w-3xl'>
        <h1>Bristol&apos;s trusted What&apos;s On Guide.</h1>
        <p className='text-md lg:text-2xl leading-6'>
          BRIGHT works directly with the city&apos;s biggest promoters to
          provide the most up-to-date what&apos;s on in Bristol guide
          you&apos;ll find.
        </p>
        <Button className='mt-5'>Find an event</Button>
      </div>
    </div>
  );
};

export default Banner;
