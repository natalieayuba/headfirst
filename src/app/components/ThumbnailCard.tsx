import React from 'react';
import Card, { type CardProps } from './card/Card';

const ThumbnailCard = ({ href, image, children }: CardProps) => (
  <Card
    className='min-w-48'
    href={href}
    image={{
      ...image,
      aspectRatio: 1.5,
      showGradient: true,
    }}
  >
    <h3 className='px-5 py-3 absolute bottom-0 text-lg md:px-6 [&&]:leading-5'>
      {children}
    </h3>
  </Card>
);

export default ThumbnailCard;
