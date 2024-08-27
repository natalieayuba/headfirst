import React, { cloneElement } from 'react';
import type { IconType } from 'react-icons';
import {
  FiArrowRight,
  FiChevronRight,
  FiClock,
  FiHeart,
  FiInfo,
  FiMapPin,
  FiSearch,
  FiShare,
  FiTag,
  FiX,
  FiCopy,
  FiChevronDown,
  FiChevronUp,
  FiCalendar,
  FiChevronLeft,
  FiPlay,
} from 'react-icons/fi';
import { PiHandsClapping } from 'react-icons/pi';
import { TbCurrencyPound } from 'react-icons/tb';

interface IconProps {
  name: string;
  size?: number | string;
  className?: string;
  fill?: string;
}

const Icon = ({ name, size, className, fill }: IconProps) => {
  const icons = {
    search: <FiSearch />,
    close: <FiX />,
    'arrow-right': <FiArrowRight />,
    clap: <PiHandsClapping />,
    'angle-right': <FiChevronRight />,
    'angle-left': <FiChevronLeft />,
    'angle-down': <FiChevronDown />,
    'angle-up': <FiChevronUp />,
    heart: <FiHeart />,
    share: <FiShare />,
    clock: <FiClock />,
    location: <FiMapPin />,
    info: <FiInfo />,
    tag: <FiTag />,
    copy: <FiCopy />,
    calendar: <FiCalendar />,
    pound: <TbCurrencyPound />,
    play: <FiPlay />,
  };

  const icon = icons[name as keyof IconType];

  return cloneElement(icon, {
    size: size ?? 24,
    className,
    fill: fill ?? 'none',
  });
};

export default Icon;
