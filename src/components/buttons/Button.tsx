import Link from 'next/link';
import React, { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

interface ButtonLinkProps extends ButtonProps {
  href: string;
  external?: boolean;
}

const styling = (alt?: boolean, className?: string) =>
  `min-w-32 w-fit px-6 py-4 font-semibold rounded text-dark-night enabled:hover:opacity-80 disabled:opacity-30 transition-opacity duration-200 ${
    alt ? 'bg-white' : 'bg-lilac'
  }${className ? ` ${className}` : ''}`;

const Button = ({
  children,
  className,
  alt,
  onClick,
  disabled,
}: ButtonProps) => (
  <button
    type='button'
    className={styling(alt, className)}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

const ButtonLink = ({
  children,
  className,
  alt,
  href,
  external,
}: ButtonLinkProps) => (
  <Link
    className={styling(alt, className)}
    href={href}
    target={external ? '_blank' : ''}
  >
    {children}
  </Link>
);

export { Button, ButtonLink };
