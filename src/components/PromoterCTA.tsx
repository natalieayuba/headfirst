import React from 'react';
import Button from './Button';

const PromoterCTA = () => {
  return (
    <div
      className='py-24 margin-x-outer flex flex-col items-center gap-4 black-and-white'
      style={{
        backgroundImage:
          'url(https://dice-media.imgix.net/attachments/2024-05-27/0a20fc88-3d46-43a3-a7de-f6c88262c13a.jpg?rect=342%2C0%2C1365%2C1365&auto=format%2Ccompress&q=40&w=328&fit=max&dpr=2)',
      }}
    >
      <h2 className='uppercase text-4xl font-bold text-center'>
        Want to promote an event with us?
      </h2>
      <Button alt className='w-fit'>
        Get started
      </Button>
    </div>
  );
};

export default PromoterCTA;
