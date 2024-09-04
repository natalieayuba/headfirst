'use client';
import React from 'react';
import HomeSection from './HomeSection';
import Hyperlink from '../Hyperlink';
import Icon from '../Icon';
import { colors } from '../../../../config';
import SlotMachine from './SlotMachine';

const Donations = () => {
  return (
    <HomeSection heading='Join us in supporting local causes'>
      <div className='content-container sm:flex sm:gap-8'>
        <div className='w-full md:flex-1 h-auto aspect-[1.9] px-20 bg-night text-lilac rounded-lg flex flex-col p-6 gap-3 md:gap-4 items-center justify-center mb-6'>
          <Icon
            name='clap'
            fill={colors.lilac}
            size='currentSize'
            className='w-8 h-auto md:w-10'
          />
          <SlotMachine />
          <p className='text-white text-opacity-60 -mt-2 md:text-lg text-center'>
            raised from ticket sales
          </p>
        </div>
        <p className='md:max-w-sm md:mr-[10%]'>
          Headfirst is a not-for-profit-orientated, local business. 100% of
          booking fees are donated directly to local causes in Bristol.
          <Hyperlink href='#' className='block mt-4 default-hover'>
            Read more
            <Icon
              name='arrow-right'
              size={14}
              className='ml-2 inline-block md:'
            />
          </Hyperlink>
        </p>
      </div>
    </HomeSection>
  );
};

export default Donations;
