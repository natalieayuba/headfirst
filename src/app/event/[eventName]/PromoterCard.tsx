import type { PromoterProps } from '@/db/schema';
import Image from 'next/image';
import React from 'react';

const PromoterCard = ({ promoter }: { promoter: PromoterProps }) => (
  <div className='bg-night rounded-lg w-full md:w-96 py-4 px-6 mt-8 mb-12 flex gap-4 items-center'>
    <Image
      src={`/${promoter.avatar ?? 'pp.svg'}`}
      alt={`${promoter.name} profile picture`}
      width={0}
      height={0}
      sizes='100vw'
      className='size-10 rounded-full'
    />
    <p className='text-white text-opacity-60'>
      Hosted by{' '}
      <span className='text-white text-opacity-90'>{promoter.name}</span>
    </p>
  </div>
);

export default PromoterCard;
