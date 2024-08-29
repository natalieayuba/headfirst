import React, { type ReactNode } from 'react';
import Link from 'next/link';
import { appendClassName } from '@/utils/formatting';

interface HyperLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const HyperLink = ({ href, className, children }: HyperLinkProps) => (
  <Link
    href={href}
    className={`text-lilac font-medium${appendClassName(className)}`}
  >
    {children}
  </Link>
);

export default HyperLink;
