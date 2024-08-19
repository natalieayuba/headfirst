import React from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { appendClassName } from '@/utils/formatting';

interface HyperLinkProps {
  href: string;
  text: string;
  icon?: string;
  className?: string;
}

const HyperLink = ({ href, text, icon, className }: HyperLinkProps) => {
  return (
    <Link
      href={href}
      className={`text-lilac font-medium${appendClassName(className)}`}
    >
      {text}
      {icon && <Icon name={icon} size={14} className='ml-2 inline-block' />}
    </Link>
  );
};

export default HyperLink;
