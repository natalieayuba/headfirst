import Image from 'next/image';
import React from 'react';
import CTABanner from './CTABanner';

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

const MobileAppPromo = () => (
  <CTABanner
    heading='Get your tickets in a tap'
    description='Download the Headfirst app to find the best events in Bristol, tailored to your taste.'
    headingClassName='text-5xl'
    descriptionClassName='tracking-[-0.005em]'
  >
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
            className='h-11 w-auto'
          />
        </a>
      ))}
    </div>
    <Image
      src='/headfirst-app-mock.png'
      alt='Headfirst Bristol app'
      width={0}
      height={0}
      sizes='100vw'
      className='w-96 h-auto relative top-12 left-1/2 -translate-x-[45%]'
    />
  </CTABanner>
);

export default MobileAppPromo;
