import { appendClassName } from '@/utils/formatting';
import React, {
  forwardRef,
  type ComponentProps,
  type ReactElement,
} from 'react';

interface HorizontalScrollProps {
  list: any[];
  renderItem: (item: any, index: number) => ReactElement;
  className?: string;
}

const HorizontalScroll = forwardRef<HTMLOListElement, HorizontalScrollProps>(
  ({ list, renderItem, className, ...rest }, ref) => (
    <ul
      ref={ref}
      className={`flex overflow-y-hidden overflow-x-auto gap-4 content-container hide-scrollbar${appendClassName(
        className
      )}`}
      {...rest}
    >
      {list.map((item, index) => (
        <li key={`${item.name}${index}`}>{renderItem(item, index)}</li>
      ))}
    </ul>
  )
);

HorizontalScroll.displayName = 'HorizontalScroll';

export default HorizontalScroll;
