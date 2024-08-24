import React, { type ReactElement } from 'react';

interface HorizontalScrollProps {
  list: any[];
  card: (item: any) => ReactElement;
}

const HorizontalScroll = ({ list, card }: HorizontalScrollProps) => {
  return (
    <ol className='flex overflow-y-scroll gap-4 px-6'>
      {list.map((item) => (
        <li key={item.name} className='flex-shrink-0'>
          {card(item)}
        </li>
      ))}
    </ol>
  );
};

export default HorizontalScroll;
