import React from 'react';
import HomeSection from './HomeSection';
import Hyperlink from '../Hyperlink';
import Icon from '../Icon';
import { colors } from '../../../../config';

const Donations = () => (
  <HomeSection heading='Join us in supporting local causes'>
    <div className='px-6'>
      <div className='w-full h-auto aspect-[1.9] bg-night text-lilac rounded-lg flex flex-col p-6 gap-3 items-center justify-center mb-6'>
        <Icon name='clap' size={32} fill={colors.lilac} />
        <p className='heading-lg'>
          <span className='font-sans font-extrabold text-3xl'>£</span>
          14,177.50
        </p>
        <p className='text-white-alpha-60 -mt-2'>raised from ticket sales</p>
      </div>
      <p>
        Headfirst is a not-for-profit-orientated, local business. 100% of
        booking fees are donated directly to local causes in Bristol.
        <Hyperlink
          href='#'
          text='Read more'
          icon='arrow-right'
          className='block mt-4'
        />
      </p>
    </div>
  </HomeSection>
);

export default Donations;
