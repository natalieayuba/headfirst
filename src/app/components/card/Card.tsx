import Link from 'next/link';
import Image from 'next/image';
import React, { type ReactNode } from 'react';

interface CardProps {
  href: string;
  className?: string;
  image: {
    src: string;
    alt: string;
    aspectRatio: 1 | 1.5;
    showGradient?: boolean;
  };
  children: ReactNode;
}

const Card = ({ className, image, children, href }: CardProps) => (
  <Link className={`group block relative ${className}`} {...{ href }}>
    <div
      className={`relative rounded-lg overflow-hidden -z-10 ${image.showGradient ? 'after:absolute after:bg-gradient-to-b after:from-transparent after:to-dark-night after:to-[110%] after:inset-0' : ''}`}
      style={{ aspectRatio: image.aspectRatio }}
    >
      <Image
        src={image.src}
        fill
        sizes='100vw'
        className='object-cover md:group-hover:scale-110 transition duration-200 ease-out h-auto'
        alt={image.alt}
      />
    </div>
    {children}
  </Link>
);

export default Card;
