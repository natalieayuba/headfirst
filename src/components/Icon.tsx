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
} from 'react-icons/fi';
import { PiHandsClapping } from 'react-icons/pi';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { TbCurrencyPound } from 'react-icons/tb';

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
    'angle-right': <FiChevronRight />,
    'angle-left': <FiChevronLeft />,
    'angle-down': <FiChevronDown />,
    'angle-up': <FiChevronUp />,
    heart: <FiHeart />,
    'heart-filled': <IoMdHeart />,
    share: <FiShare />,
    clock: <FiClock />,
    location: <FiMapPin />,
    info: <FiInfo />,
    tag: <FiTag />,
    copy: <FiCopy />,
    calendar: <FiCalendar />,
    pound: <TbCurrencyPound />,
  };

  const icon = icons[name as keyof IconType];

  return cloneElement(icon, { size: size ?? 24, className });
};

export default Icon;
