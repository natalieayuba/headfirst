import React from 'react';
import Dialog from './components/Dialog';
import Image from 'next/image';

const Loading = () => (
  <Dialog>
    <div className='size-full flex items-center justify-center'>
      <Image
        src='/logo.svg'
        alt='Headfirst logo'
        width={0}
        height={0}
        className='w-32 animate-loaderPulse'
      />
    </div>
  </Dialog>
);

export default Loading;
