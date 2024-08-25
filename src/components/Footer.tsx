import Image from 'next/image';
import React from 'react';
import Icon from './Icon';
import Divider from './Divider';
import Link from 'next/link';

const Footer = () => {
  const legalLinks = [
    'Privacy Policy',
    'Terms & Conditions',
    'Cookie Policy',
    'Cookie Preferences',
  ];

  const footerLinks = [
    {
      heading: 'Events',
      links: ['Find an event', 'Promote an event'],
    },
    {
      heading: 'Support',
      links: ['Help center', 'Contact us', 'Request a refund'],
    },
    {
      heading: 'Headfirst',
      links: ['About us', 'Careers', 'Donate'],
    },
  ];

  return (
    <footer className='bg-night margin-x-outer text-sm'>
      <div className='pt-16'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='Headfirst logo'
            width='0'
            height='0'
            className='w-20 h-auto'
          />
        </Link>
        <div className='my-6'>
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className='mb-6'>
              <h3 className='text-white-alpha-60 mb-4'>{heading}</h3>
              <ul className='flex flex-col gap-4'>
                {links.map((link) => (
                  <li key={link}>
                    <Link href={link === 'Find an event' ? '/whats-on' : '#'}>
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <div className='pb-10 flex flex-col gap-3'>
        <p className='text-white-alpha-60'>© 2024 Headfirst Bristol</p>
        <ul className='flex flex-wrap gap-x-4'>
          {legalLinks.map((link) => (
            <li key={link}>
              <Link href='#'>{link}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
