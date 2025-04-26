import Image from 'next/image';
import React from 'react';

const MobileAppPromo = () => {
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
    <div className='content-container h-[480px] flex md:gap-10 flex-col md:flex-row md:justify-between'>
      <div className='flex-1 md:h-full md:-mt-10 flex flex-col justify-center'>
        <h2
          // ref={observedRef as RefObject<HTMLHeadingElement>}
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
        // ref={imgRef}
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
    </div>
  );
};

export default MobileAppPromo;
