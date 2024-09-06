import React, { type ComponentProps } from 'react';
import Link from '../Link';

interface ButtonProps {
  alt?: boolean;
  external?: boolean;
}

const styling = (alt?: boolean, className?: string) =>
  `button ${alt ? 'bg-white' : 'bg-lilac'}${className ? ` ${className}` : ''}`;

const Button = ({
  alt,
  className,
  ...rest
}: ButtonProps & ComponentProps<'button'>) => (
  <button type='button' className={styling(alt, className)} {...rest}>
    {rest.children}
  </button>
);

const ButtonLink = ({
  alt,
  className,
  external,
  ...rest
}: ButtonProps & ComponentProps<typeof Link>) =>
  external ? (
    <a
      target='_blank'
      className={styling(alt, className)}
      href={rest.href.toString()}
      rel='noopener noreferrer'
    >
      {rest.children}
    </a>
  ) : (
    <Link className={styling(alt, className)} href={rest.href}>
      {rest.children}
    </Link>
  );
export { Button, ButtonLink };
