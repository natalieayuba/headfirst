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

const HorizontalScroll = forwardRef<
  HTMLOListElement,
  HorizontalScrollProps & ComponentProps<'ol'>
>(({ list, renderItem, className, ...rest }, ref) => (
  <ol
    ref={ref}
    className={`flex overflow-y-hidden overflow-x-auto gap-4 md:gap-6 content-container hide-scrollbar${appendClassName(
      className
    )}`}
    {...rest}
  >
    {list.map((item, index) => (
      <li key={`${item.name}${index}`}>{renderItem(item, index)}</li>
    ))}
  </ol>
));

HorizontalScroll.displayName = 'HorizontalScroll';

export default HorizontalScroll;
