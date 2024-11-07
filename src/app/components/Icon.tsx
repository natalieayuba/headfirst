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
  FiUser,
  FiMusic,
  FiMaximize2,
  FiMenu,
  FiGlobe,
} from 'react-icons/fi';
import { PiHandsClapping, PiSparkle } from 'react-icons/pi';
import { TbCurrencyPound } from 'react-icons/tb';
import {
  FaCcVisa,
  FaSpotify,
  FaBandcamp,
  FaTiktok,
  FaFacebook,
  FaInstagram,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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
    instagram: <FaInstagram />,
    facebook: <FaFacebook />,
    tiktok: <FaTiktok />,
    x: <FaXTwitter />,
    bandcamp: <FaBandcamp />,
    spotify: <FaSpotify />,
    sparkle: <PiSparkle />,
    user: <FiUser />,
    music: <FiMusic />,
    expand: <FiMaximize2 />,
    menu: <FiMenu />,
    language: <FiGlobe />,
  };

  const icon = icons[name as keyof IconType];

  return cloneElement(icon, {
    size: size ?? 24,
    className,
    fill: fill ?? 'none',
  });
};

export default Icon;
