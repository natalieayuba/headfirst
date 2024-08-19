import { getUrlFromHeading } from '@/utils/formatting';
import Link from 'next/link';
import React, { type ReactElement } from 'react';

interface HorizontalScrollProps {
  list: any[];
  card: (item: any) => ReactElement;
}

const HorizontalScroll = ({ list, card }: HorizontalScrollProps) => {
  return (
    <ol className='flex overflow-y-scroll gap-4'>
      {list.map((item) => (
        <li key={item.name} className='flex-shrink-0'>
          <Link href={`/events/${getUrlFromHeading(item.name)}`}>
            {card(item)}
          </Link>
        </li>
      ))}
    </ol>
  );
};

export default HorizontalScroll;
