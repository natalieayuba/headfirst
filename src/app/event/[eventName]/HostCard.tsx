import Image from 'next/image';
import React from 'react';

const HostCard = () => (
  <div className='bg-night rounded-lg w-full md:w-96 py-4 px-5 mt-8 mb-12 flex gap-4 items-center'>
    <Image
      src='/pp.svg'
      alt='Host profile picture'
      width={0}
      height={0}
      className='size-10'
    />
    <p className='text-white text-opacity-60'>
      Hosted by{' '}
      <span className='text-white text-opacity-90'>The John Doe Group</span>
    </p>
  </div>
);

export default HostCard;
