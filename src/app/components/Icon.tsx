import React from 'react';
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
  FiMessageCircle,
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
  name: keyof typeof icons;
  size?: number | string;
  className?: string;
  fill?: string;
  title?: string;
}

const icons = {
  search: FiSearch,
  close: FiX,
  'arrow-right': FiArrowRight,
  clap: PiHandsClapping,
  'angle-right': FiChevronRight,
  'angle-left': FiChevronLeft,
  'angle-down': FiChevronDown,
  'angle-up': FiChevronUp,
  heart: FiHeart,
  share: FiShare,
  clock: FiClock,
  location: FiMapPin,
  info: FiInfo,
  tag: FiTag,
  copy: FiCopy,
  calendar: FiCalendar,
  pound: TbCurrencyPound,
  play: FiPlay,
  plus: FiPlusCircle,
  minus: FiMinusCircle,
  card: FiCreditCard,
  visa: FaCcVisa,
  instagram: FaInstagram,
  facebook: FaFacebook,
  tiktok: FaTiktok,
  x: FaXTwitter,
  bandcamp: FaBandcamp,
  spotify: FaSpotify,
  sparkle: PiSparkle,
  user: FiUser,
  music: FiMusic,
  expand: FiMaximize2,
  menu: FiMenu,
  language: FiGlobe,
  help: FiMessageCircle,
};

const Icon = ({ name, size = 24, fill = 'none', ...rest }: IconProps) => {
  const IconType = icons[name];
  return <IconType {...{ size, fill, ...rest }} />;
};

export default Icon;
