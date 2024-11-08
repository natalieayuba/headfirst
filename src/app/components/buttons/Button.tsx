import React, { type ReactNode } from 'react';
import Link from '../Link';
import { appendClassName } from '@/utils/formatting';

interface BaseProps {
  style?: 'primary' | 'secondary' | 'tertiary';
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}

interface ButtonProps extends BaseProps {
  href?: never;
  external?: never;
}
interface LinkButtonProps extends BaseProps {
  href?: string;
  external?: boolean;
}

const Button = ({
  style = 'primary',
  className,
  onClick,
  children,
  ...rest
}: ButtonProps | LinkButtonProps) => {
  const Wrapper = rest.href ? (rest.external ? 'a' : Link) : 'button';
  return (
    <Wrapper
      className={`min-w-28 px-4 h-12 flex items-center justify-center font-semibold rounded text-dark-night enabled:hover:opacity-85 disabled:opacity-30 transition-opacity duration-200 ${
        style === 'primary'
          ? 'bg-lilac'
          : style === 'secondary'
          ? 'bg-white'
          : 'bg-transparent border text-white'
      }${appendClassName(className)}`}
      href={rest.href as string}
      {...(Wrapper === 'button' && { type: 'button' })}
      {...(rest.href &&
        rest.external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...rest}
    >
      {children}
    </Wrapper>
  );
};

export default Button;
