import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { appendClassName } from '@/utils/formatting';
import Icon, { type icons } from './Icon';

interface HyperLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: keyof typeof icons;
}

const HyperLink = ({ href, className, children, icon }: HyperLinkProps) => (
  <Link
    href={href}
    className={`text-lilac w-fit font-medium default-hover${appendClassName(
      className
    )}`}
  >
    {children}
    {icon && <Icon name={icon} size={14} className='ml-2 inline-block' />}
  </Link>
);

export default HyperLink;
