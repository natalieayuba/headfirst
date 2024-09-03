'use client';
import React from 'react';
import HomeSection from './HomeSection';
import Hyperlink from '../Hyperlink';
import Icon from '../Icon';
import { colors } from '../../../../config';
import SlotMachine from './SlotMachine';

const Donations = () => {
  const moneyRaised = 14177.5;
  const donation = 0.65;

  const formatCurrency = (donation: number) =>
    donation
      .toLocaleString('en', { minimumFractionDigits: 2 })
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <HomeSection heading='Join us in supporting local causes'>
      <div className='content-container sm:flex sm:gap-8'>
        <div className='w-full md:flex-1 h-auto aspect-[1.9] bg-night text-lilac rounded-lg flex flex-col p-6 gap-3 md:gap-4 items-center justify-center mb-6'>
          <Icon
            name='clap'
            fill={colors.lilac}
            size='currentSize'
            className='w-8 h-auto md:w-10'
          />
          <p className='heading-lg sm:text-7xl lg:text-heading-lg'>
            <span className='font-sans font-extrabold text-3xl md:text-5xl'>
              £
            </span>
            {formatCurrency(moneyRaised)}
          </p>
          <p className='text-white text-opacity-60 -mt-2 md:text-lg'>
            raised from ticket sales
          </p>
        </div>
        <p className='md:max-w-sm md:mr-24'>
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
      <SlotMachine />
    </HomeSection>
  );
};

export default Donations;
