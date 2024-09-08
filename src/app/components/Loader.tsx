'use client';
import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { colors } from '../../../config';

const Loader = () => (
  <div
    className={
      'fixed left-0 top-0 bottom-0 right-0 z-[10000] bg-dark-night bg-opacity-90 h-dvh w-screen flex items-center justify-center animate-fadeIn animate'
    }
  >
    <ThreeDots
      visible={true}
      height='80'
      width='80'
      color={colors.lilac}
      radius='9'
      ariaLabel='loader'
    />
  </div>
);

export default Loader;
