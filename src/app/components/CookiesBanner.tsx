import React from 'react';
import HyperLink from './Hyperlink';
import { Button } from './buttons/Button';

const CookiesBanner = ({ onClose }: { onClose: () => void }) => (
  <div
    className='fixed bottom-0 left-0 right-0 bg-night p-6 md:flex justify-between items-center flex-wrap gap-x-8 gap-y-4 animate-maskIn'
    style={{ animationDelay: '3000ms', animationDuration: '500ms' }}
  >
    <div className='mb-4 md:mb-0'>
      <p className='text-2xl'>About cookies on this site</p>
      <p className='text-white text-opacity-60'>
        Headfirst uses cookies to improve your user experience. Learn more in
        our <HyperLink href='#'>Privacy Policy</HyperLink>.
      </p>
    </div>
    <div className='flex gap-3 flex-col [&_button]:w-full [&_button]:h-fit xs:flex-row [&_button]:xs:w-fit '>
      <Button onClick={onClose}>Accept all</Button>
      <Button alt onClick={onClose}>
        Reject all
      </Button>
      <Button alt>Customise</Button>
    </div>
  </div>
);

export default CookiesBanner;
