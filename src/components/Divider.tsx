import { appendClassName } from '@/utils/formatting';
import React from 'react';

const Divider = ({ width }: { width?: string }) => {
  return (
    <hr className={`rounded my-8 mx-auto border-10${appendClassName(width)}`} />
  );
};

export default Divider;
