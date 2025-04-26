import React from 'react';
import Card from './card/Card';

interface ThumbnailCardProps {
  href: string;
  src: string;
  alt: string;
  text: string;
}

const ThumbnailCard = ({ href, src, alt, text }: ThumbnailCardProps) => (
  <Card
    className='min-w-48'
    href={href}
    image={{
      src,
      alt,
      aspectRatio: 1.5,
      showGradient: true,
    }}
  >
    <h3 className='px-5 py-3 absolute bottom-0 text-lg md:px-6 [&&]:leading-5'>
      {text}
    </h3>
  </Card>
);

export default ThumbnailCard;
