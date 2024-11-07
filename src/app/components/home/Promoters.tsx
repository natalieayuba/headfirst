'use client';
import useElementVisible from '@/hooks/useElementVisible';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, type RefObject } from 'react';
import Button from '../buttons/Button';

const Promoters = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const { visible, observedRef } = useElementVisible();
  const badges = [
    {
      image: '/download-on-the-app-store.svg',
      link: 'https://apps.apple.com/gb/app/headfirst-bristol-whats-on/id444081524',
      alt: 'Download on the App Store',
    },
    {
      image: '/GetItOnGooglePlay_Badge_Web_color_English.png',
      link: 'https://play.google.com/store/apps/details?id=com.ionicframework.headfirstbristol769518&hl=en_GB',
      alt: 'Get it on Google Play',
    },
  ];

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
        {/* <div className='content-container h-[480px] flex md:gap-10 flex-col md:flex-row md:justify-between'>
          <div className='flex-1 md:h-full md:-mt-10 flex flex-col justify-center'>
            <h2
              ref={observedRef as RefObject<HTMLHeadingElement>}
              className='font-medium mb-4 md:mb-6 text-xl md:text-3xl leading-6'
            >
              Get tailored recommendations with the Headfirst mobile app
            </h2>
            <div className='flex justify-center gap-3'>
              {badges.map(({ image, link, alt }) => (
                <a
                  key={alt}
                  href={link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='default-hover'
                >
                  <Image
                    src={image}
                    alt={alt}
                    width={0}
                    height={0}
                    sizes='100vw'
                    className='h-10 md:h-12 w-auto'
                  />
                </a>
              ))}
            </div>
          </div>
          <div
            ref={imgRef}
            className='opacity-0 scale-0 translate-y-full -rotate-12 animation-delay-400 md:animation-delay-300'
          >
            <Image
              src='/headfirst-app-mock.png'
              alt='Headfirst Bristol app'
              width={0}
              height={0}
              sizes='100vw'
              priority
              className='w-96 h-auto relative top-12 left-1/2 -translate-x-[45%]'
            />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Promoters;
