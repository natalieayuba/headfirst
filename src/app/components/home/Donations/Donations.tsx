'use client';
import React from 'react';
import HomeSectionTemplate from '../HomeSectionTemplate';
import Hyperlink from '../../Hyperlink';
import Icon from '../../Icon';
import { colors } from '../../../../../config';
import SlotMachine from './components/SlotMachine';

const Donations = () => (
  <HomeSectionTemplate heading='Join us in supporting local causes'>
    <div className='content-container sm:flex sm:gap-10'>
      <div className='w-full md:flex-1 h-auto select-none aspect-[1.9] bg-night text-lilac rounded-lg flex flex-col p-6 gap-3 md:gap-4 items-center justify-center mb-7'>
        <Icon
          name='clap'
          fill={colors.lilac}
          size='currentSize'
          className='w-8 h-auto md:w-10'
        />
        <SlotMachine />
        <p className='-mt-2 md:text-lg text-center'>raised from ticket sales</p>
      </div>
      <p className='md:max-w-sm md:mr-[10%] md:text-lg'>
        Headfirst is a not-for-profit-orientated, local business. 100% of
        booking fees are donated directly to causes in Bristol.
        <Hyperlink
          href='#'
          className='block mt-4 default-hover'
          icon='arrow-right'
        >
          Learn more
        </Hyperlink>
      </p>
    </div>
  </HomeSectionTemplate>
);

export default Donations;
