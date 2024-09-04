'use client';
import useElementVisible from '@/hooks/useElementVisible';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef } from 'react';

const AppAd = () => {
  const imgRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const { visible } = useElementVisible(headingRef);
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
    <div className='bg-lilac pt-16 px-8 text-night text-center overflow-hidden'>
      <div className='content-container h-[480px] flex md:gap-10 flex-col md:flex-row md:justify-between'>
        <div className='flex-1 md:h-full md:-mt-10 flex flex-col justify-center'>
          <h2
            ref={headingRef}
            className='font-medium mb-4 md:mb-6 text-xl md:text-3xl leading-6'
          >
            Get tailored recommendations with the Headfirst mobile app
          </h2>
          <div className='flex justify-center gap-3'>
            {badges.map(({ image, link, alt }) => (
              <Link key={alt} href={link} className='default-hover'>
                <Image
                  src={image}
                  alt={alt}
                  width={0}
                  height={0}
                  sizes='100vw'
                  className='h-10 md:h-12 w-auto'
                />
              </Link>
            ))}
          </div>
        </div>
        <div
          ref={imgRef}
          style={{ animationDelay: '200ms' }}
          className='opacity-0 scale-0 translate-y-full -rotate-12'
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
      </div>
    </div>
  );
};

export default AppAd;
