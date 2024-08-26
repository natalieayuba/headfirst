import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AppAd = () => {
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

  return (
    <div className='bg-lilac flex flex-col h-[480px] pt-14 px-8 gap-6 text-night text-center relative overflow-clip'>
      <h2 className='font-medium text-xl leading-none'>
        Get tailored recommendations with the Headfirst mobile app
      </h2>
      <div className='flex justify-center gap-3'>
        {badges.map(({ image, link, alt }) => (
          <Link key={alt} href={link}>
            <Image
              src={image}
              alt={alt}
              width={0}
              height={0}
              sizes='100vw'
              className='h-10 w-auto'
            />
          </Link>
        ))}
      </div>
      <Image
        src='/headfirst-app-mock.png'
        alt='Headfirst Bristol app'
        width={324}
        height={566}
        sizes='100vw'
        className='absolute left-[52px] top-[200px]'
      />
    </div>
  );
};

export default AppAd;
