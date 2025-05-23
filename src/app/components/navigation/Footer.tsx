import Image from 'next/image';
import React from 'react';
import Icon, { type IconProps } from '../Icon';
import Accordian from '../Accordian';
import Button from '../buttons/Button';
import LanguageSelect from '../home/LanguageSelect';
import Link from 'next/link';
import { navLinks } from '../../../../config';

const Footer = () => {
  const legal = ['Privacy', 'Terms', 'Cookies', 'Sitemap'];

  const links = [
    {
      heading: 'Headfirst Bristol',
      content: Object.values(navLinks).map(({ text }) => text),
    },
    {
      heading: 'Help',
      content: ['FAQs', 'Contact us', 'Request a refund'],
    },
    {
      heading: 'Work with us',
      content: ['Sell tickets', 'Volunteering', 'Careers'],
    },
    {
      heading: 'Subscribe to our newsletter',
      content: (
        <div>
          <p>
            Get weekly updates with the best of music, weird one-off events, and
            sell-out warnings.
          </p>
          <Button type='tertiary' className='h-10 mt-4'>
            Sign up
          </Button>
        </div>
      ),
    },
  ];

  const socials = ['instagram', 'facebook', 'x', 'tiktok'];

  const badges = [
    {
      alt: 'Download Headfirst Bristol on the App Store',
      src: '/download-on-the-app-store.svg',
      url: 'https://apps.apple.com/gb/app/headfirst-bristol-whats-on/id444081524',
    },
    {
      alt: 'Get Headfirst on Google Play',
      src: '/GetItOnGooglePlay_Badge_Web_color_English.png',
      url: 'https://play.google.com/store/apps/details?id=com.ionicframework.headfirstbristol769518&hl=en_GB',
    },
  ];

  return (
    <footer className='bg-night text-sm mt-auto'>
      <div className='container-max-w pt-16 pb-6 flex flex-col gap-4'>
        <div className='container-mx pb-6'>
          <Link href='/' className='block mb-6'>
            <Image
              src='/logo-white.svg'
              alt='Headfirst Bristol logo'
              width='0'
              height='0'
              className='w-20 h-auto'
            />
          </Link>
          <div className='flex gap-4 mb-6'>
            {socials.map((social) => (
              <a key={social} href='#'>
                <Icon name={social as IconProps['name']} fill='#fff' />
              </a>
            ))}
          </div>
          <div className='flex gap-2'>
            {badges.map(({ alt, src, url }) => (
              <a key={alt} target='_blank' rel='noopener noreferrer' href={url}>
                <Image
                  alt={alt}
                  src={src}
                  width={0}
                  height={0}
                  className='w-auto h-10 default-hover'
                  unoptimized
                />
              </a>
            ))}
          </div>
        </div>
        <div>
          {links.map(({ heading, content }) => (
            <Accordian key={heading} heading={heading} content={content} />
          ))}
        </div>
        <div className='pt-3 container-mx flex flex-wrap gap-1'>
          <LanguageSelect className='w-full mb-2' />
          <p className='text-white text-opacity-80 mb-1'>
            <Icon
              name='sparkle'
              className='inline-block mr-1.5'
              fill='white'
              size={14}
            />
            Conceptual redesign by{' '}
            <a
              href='https://natalieayuba.com/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white text-opacity-100'
            >
              Natalie Ayuba
            </a>
          </p>
          <ul>
            {legal.map((link) => (
              <li
                key={link}
                className='inline-block [&:not(:last-child)]:after:content-["•"] after:px-2'
              >
                {link}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
