import React, { cloneElement } from 'react';
import type { IconType } from 'react-icons';
import { FiSearch, FiX } from 'react-icons/fi';
import { RiFacebookFill, RiInstagramLine, RiTwitterFill } from 'react-icons/ri';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
}

const Icon = ({ name, size, className }: IconProps) => {
  const icons = {
    facebook: <RiFacebookFill />,
    instagram: <RiInstagramLine />,
    twitter: <RiTwitterFill />,
    search: <FiSearch />,
    close: <FiX />,
  };

  const icon = icons[name as keyof IconType];

  return cloneElement(icon, { size: size ?? 24, className });
};

export default Icon;
