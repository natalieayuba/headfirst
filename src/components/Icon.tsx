import React, { cloneElement } from 'react';
import type { IconType } from 'react-icons';
import { FiArrowRight, FiSearch, FiX } from 'react-icons/fi';
import { PiHandsClapping } from 'react-icons/pi';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
}

const Icon = ({ name, size, className }: IconProps) => {
  const icons = {
    search: <FiSearch />,
    close: <FiX />,
    'arrow-right': <FiArrowRight />,
    clap: <PiHandsClapping />,
  };

  const icon = icons[name as keyof IconType];

  return cloneElement(icon, { size: size ?? 24, className });
};

export default Icon;
