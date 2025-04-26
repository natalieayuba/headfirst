'use client';
import Image from 'next/image';
import React from 'react';
import Button from '../buttons/Button';
import CTABanner from './CTABanner';

const Promoters = () => (
  <CTABanner
    heading='React the right people'
    description="Promote your event with Headfirst's all-in-one ticketing and
          marketing platform"
  >
    <Button type='secondary' className='mx-auto'>
      Get started
    </Button>
    <Image
      alt='Image of a concert crowd. Courtesy of Filip Andrejevic on Unsplash'
      src='/crowd.png'
      sizes='100vw'
      fill
      className='object-cover object-[-400px] pt-[235px] blur-[0.6px] mt-1'
    />
  </CTABanner>
);

export default Promoters;
