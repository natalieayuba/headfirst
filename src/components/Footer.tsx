import Image from 'next/image';
import React from 'react';
import Icon from './Icon';

const Footer = () => {
  const legalLinks = [
    'Privacy Policy',
    'Terms & Conditions',
    'Cookie Policy',
    'Cookie Preferences',
  ];

  const footerLinks = [
    {
      heading: 'Customers & Promoters',
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
    <footer className='bg-dark-purple margin-x-outer text-sm'>
      <div className='pt-16 pb-6'>
        <a href='/'>
          <Image
            src='/logo.svg'
            alt='Headfirst logo'
            width='0'
            height='0'
            className='w-20 h-auto'
          />
        </a>
        <div className='my-6'>
          {footerLinks.map(({ heading, links }) => (
            <div key={heading} className='mb-6'>
              <h3 className='text-white-alpha-60 mb-4'>{heading}</h3>
              <ul className='flex flex-col gap-4'>
                {links.map((link) => (
                  <li key={link}>
                    <a href='#'>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className='border-t border-t-white-alpha-10'>
        <div className='py-10 flex flex-col gap-6'>
          <ul className='flex flex-wrap gap-x-4'>
            {legalLinks.map((link) => (
              <li key={link}>
                <a href='#'>{link}</a>
              </li>
            ))}
          </ul>
          <ul className='flex gap-3'>
            {['facebook', 'instagram', 'twitter'].map((social) => (
              <li key={social}>
                <a className='text-2xl'>
                  <Icon name={social} />
                </a>
              </li>
            ))}
          </ul>
          <p className='text-white-alpha-60'>© 2024 Bright</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
