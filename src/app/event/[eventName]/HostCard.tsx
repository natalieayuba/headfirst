import Icon from '@/app/components/Icon';
import React from 'react';

const HostCard = () => {
  return (
    <div className='bg-night rounded-lg w-full md:w-96 py-4 px-5 mt-8 mb-12 flex gap-4 items-center'>
      <div className='size-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center text-night'>
        <Icon name='user' size={24} />
      </div>
      <p className='text-white text-opacity-60'>
        Hosted by{' '}
        <span className='text-white text-opacity-90'> The John Doe Group</span>
      </p>
    </div>
  );
};

export default HostCard;
