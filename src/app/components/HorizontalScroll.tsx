import { appendClassName } from '@/utils/formatting';
import React, { forwardRef, type ReactElement } from 'react';

interface HorizontalScrollProps {
  list: any[];
  card: (item: any) => ReactElement;
  className?: string;
}

const HorizontalScroll = forwardRef<HTMLOListElement, HorizontalScrollProps>(
  ({ list, card, className }, ref) => (
    <ol
      ref={ref}
      className={`flex overflow-x-scroll overflow-y-hidden gap-4 px-6 py-4 hide-scrollbar${appendClassName(
        className
      )}`}
    >
      {list.map((item) => (
        <li key={item.name} className='flex-shrink-0'>
          {card(item)}
        </li>
      ))}
    </ol>
  )
);

HorizontalScroll.displayName = 'HorizontalScroll';

export default HorizontalScroll;
