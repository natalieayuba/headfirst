import React from 'react';
import type { IconType } from 'react-icons';
import { RiFacebookFill, RiInstagramLine, RiTwitterFill } from 'react-icons/ri';

const Icon = ({ name }: { name: string }) => {
  const icons = {
    facebook: <RiFacebookFill />,
    instagram: <RiInstagramLine />,
    twitter: <RiTwitterFill />,
  };

  return icons[name as keyof IconType];
};

export default Icon;
