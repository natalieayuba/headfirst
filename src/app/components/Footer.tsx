import Image from 'next/image';
import React from 'react';
import Divider from './Divider';
import Link from './Link';

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
    <footer className='bg-night text-sm'>
      <div className='pt-16 content-container flex flex-col gap-y-8 md:flex-row items-start justify-between flex-wrap'>
        <Link href='/'>
          <Image
            src='/logo.svg'
            alt='Headfirst Bristol logo'
            width='0'
            height='0'
            className='w-20 h-auto'
          />
        </Link>
        <div className='inline-flex gap-x-32 flex-col sm:flex-row'>
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className='mb-6'>
              <h3 className='text-white text-opacity-60 mb-4'>{heading}</h3>
              <ul className='flex flex-col gap-4'>
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      className='default-hover'
                      href={link === 'Find an event' ? '/whats-on' : '#'}
                    >
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
      <div className='pb-10 content-container flex flex-col md:flex-row gap-3'>
        <p className='text-white text-opacity-60'>© 2024 Headfirst Bristol</p>
        <ul className='flex flex-wrap gap-x-4'>
          {legalLinks.map((link) => (
            <li key={link}>
              <Link href='#' className='default-hover'>
                {link}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
