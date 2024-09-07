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
  FiPlusCircle,
  FiMinusCircle,
  FiCreditCard,
  FiInstagram,
  FiUser,
  FiMusic,
} from 'react-icons/fi';
import { PiHandsClapping, PiSparkle } from 'react-icons/pi';
import { TbCurrencyPound } from 'react-icons/tb';
import { FaCcVisa, FaSpotify, FaBandcamp } from 'react-icons/fa';
import { VscSparkle } from 'react-icons/vsc';

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
    plus: <FiPlusCircle />,
    minus: <FiMinusCircle />,
    card: <FiCreditCard />,
    visa: <FaCcVisa />,
    instagram: <FiInstagram />,
    bandcamp: <FaBandcamp />,
    spotify: <FaSpotify />,
    sparkle: <PiSparkle />,
    user: <FiUser />,
    music: <FiMusic />,
  };

  const icon = icons[name as keyof IconType];

  return cloneElement(icon, {
    size: size ?? 24,
    className,
    fill: fill ?? 'none',
  });
};

export default Icon;
