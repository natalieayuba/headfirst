'use client';
import React, { type ReactNode } from 'react';
import { colors, type LinkProps } from '../../../../config';
import Link from 'next/link';
import Icon from '../Icon';

interface AnimatedLinkProps {
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  svgClassName?: string;
  text: ReactNode;
  onClick?: () => void;
  hovered: boolean;
}

const AnimatedLink = ({
  hoverAnimation,
  text,
  svgClassName,
  url,
  hovered,
  onClick,
  ...rest
}: AnimatedLinkProps & LinkProps) => {
  const Type = url ? Link : 'button';
  const isSearch = text === 'Search';

  const renderAnimatedHoverPath = (className?: string) => {
    const { width, height, paths, delta } = hoverAnimation;
    return (
      <svg
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        viewBox={`0 0 ${width} ${height}`}
        className={`hidden md:block absolute left-1/2 -translate-x-1/2 ${className || ''}`}
        {...{ width, height }}
      >
        {paths.map((d) => (
          <path
            key={d}
            {...{ d }}
            stroke={colors.lilac}
            strokeWidth='3'
            strokeLinecap='round'
            strokeDasharray={delta}
            strokeDashoffset={hovered ? 0 : delta}
            className='transition-all duration-[350ms] ease-in-out'
          />
        ))}
      </svg>
    );
  };

  return (
    <Type
      className={`font-medium relative ${!isSearch ? 'hidden lg:block' : ''}`}
      href={url ?? ''}
      {...{ ...rest, onClick }}
    >
      {isSearch ? <Icon name='search' title='Search' /> : text}
      {renderAnimatedHoverPath(svgClassName)}
    </Type>
  );
};

export default AnimatedLink;
