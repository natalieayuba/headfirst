import { appendClassName } from '@/utils/formatting';
import React, { type ReactElement } from 'react';

interface HorizontalScrollProps {
  list: any[];
  card: (item: any) => ReactElement;
  className?: string;
}

const HorizontalScroll = ({ list, card, className }: HorizontalScrollProps) => {
  return (
    <ol
      className={`flex overflow-x-scroll overflow-y-hidden gap-4 px-6 py-4${appendClassName(
        className
      )}`}
    >
      {list.map((item) => (
        <li key={item.name} className='flex-shrink-0'>
          {card(item)}
        </li>
      ))}
    </ol>
  );
};

export default HorizontalScroll;
