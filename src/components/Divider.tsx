import { appendClassName } from '@/utils/formatting';
import React from 'react';

const Divider = ({ className }: { className?: string }) => {
  return (
    <hr className={`rounded my-8 border-10${appendClassName(className)}`} />
  );
};

export default Divider;
