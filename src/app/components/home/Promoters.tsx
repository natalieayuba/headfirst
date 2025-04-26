'use client';
import useElementVisible from '@/hooks/useElementVisible';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, type RefObject } from 'react';
import Button from '../buttons/Button';

const Promoters = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { visible, observedRef } = useElementVisible();

  useEffect(() => {
    if (visible && imgRef.current) {
      imgRef.current.classList.add('animate-bounceIn');
    }
  }, [visible]);

  return (
    <div className='content-container'>
      <div className='bg-lilac rounded-lg pt-12 px-4 text-night text-center h-[500px] flex flex-col items-center relative overflow-hidden'>
        <h2 className='heading-lg'>React the right people.</h2>
        <p className='max-w-[240px]'>
          Promote your event with Headfirst&apos;s all-in-one ticketing and
          marketing platform.
        </p>
        <Button className='[&&]:bg-dark-night text-white mt-5'>
          Get started
        </Button>
        <div className='max-h-60 h-full -left-2 -right-2 -bottom-1 absolute blur-[0.6px]'>
          <Image
            alt='Image of a concert crowd. Courtesy of Filip Andrejevic on Unsplash'
            src='/crowd.png'
            fill
            className='object-cover object-[85%]'
            unoptimized
          />
        </div>
      </div>
    </div>
  );
};

export default Promoters;
