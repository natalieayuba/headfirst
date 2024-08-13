import Image from 'next/image';
import React from 'react';
import { RiFacebookFill, RiInstagramLine, RiTwitterFill } from 'react-icons/ri';

const Footer = () => {
  const legalLinks = [
    'Privacy Policy',
    'Terms & Conditions',
    'Cookie Policy',
    'Cookie Preferences',
  ];

  const socialLinks = [
    <RiFacebookFill key='Facebook' />,
    <RiInstagramLine key='Instagram' />,
    <RiTwitterFill key='Twitter' />,
  ];

  const appDownloadImgs = [
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/2560px-Download_on_the_App_Store_Badge.svg.png',
      alt: 'Download on the App Store',
    },
    {
      src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1280px-Google_Play_Store_badge_EN.svg.png?20220907104002',
      alt: 'Get it on Google Play',
    },
  ];

  const footerLinks = [
    {
      heading: 'Customers & Organisers',
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
        <a href='/' className='text-xl font-semibold tracking-widest'>
          Headfirst
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
          <ul className='flex flex-col gap-4'>
            {legalLinks.map((link) => (
              <li key={link}>
                <a href='#'>{link}</a>
              </li>
            ))}
          </ul>
          <ul className='flex gap-4'>
            {socialLinks.map((icon) => (
              <li key={icon.key}>
                <a className='text-2xl'>{icon}</a>
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
