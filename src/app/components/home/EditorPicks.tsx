'use client';
import React, {
  useRef,
  useState,
  type ComponentProps,
  type ForwardedRef,
  type MouseEvent,
  type RefObject,
  type UIEvent,
} from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import EventCard from '../EventCard';
import Icon from '../Icon';
import type { EventProps, VenueProps } from '@/db/schema';

interface SliderArrowProps {
  direction: 'right' | 'left';
  sliderRef: ForwardedRef<HTMLOListElement>;
}

const SliderArrow = ({
  direction,
  sliderRef,
  ...rest
}: SliderArrowProps & ComponentProps<'button'>) => {
  const handleClick = (e: MouseEvent) => {
    const slider = (sliderRef as RefObject<HTMLOListElement>).current!;
    if (direction === 'right') {
      slider.scrollLeft += 800;
    } else if (direction === 'left') {
      slider.scrollLeft -= 800;
    }
  };

  return (
    <button
      className='transition-opacity duration-150 disabled:opacity-30'
      onClick={handleClick}
      {...rest}
    >
      <Icon size={32} name={`angle-${direction}`} />
    </button>
  );
};

interface EditorPicksProps {
  events: EventProps[];
  venues: VenueProps[];
}

const EditorPicks = ({ events, venues }: EditorPicksProps) => {
  const sliderRef = useRef<HTMLOListElement>(null);
  const [scrollLeft, setScrollLeft] = useState(sliderRef.current?.scrollLeft);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const editorsPicks = events.filter(({ editorsPick }) => editorsPick === true);
  const [click, setClick] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleScroll = (e: UIEvent) => {
    const maxScrollLeft =
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth;
    setMaxScrollWidth(maxScrollLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleDrag = (e: MouseEvent) => {
    if (click) {
      console.log(e.clientX);
      e.preventDefault();
      e.currentTarget.scrollLeft -= e.clientX - startX * 2;
    }
  };

  return (
    <HomeSection
      heading="Our editors' top picks"
      caption='Explore the best gigs and nights out in Bristol, curated by our editorial team.'
      rightDiv={
        <div className='hidden md:block'>
          <SliderArrow
            direction='left'
            sliderRef={sliderRef}
            disabled={scrollLeft === 0}
          />
          <SliderArrow
            direction='right'
            sliderRef={sliderRef}
            disabled={scrollLeft === maxScrollWidth}
          />
        </div>
      }
    >
      <HorizontalScroll
        id='slider'
        ref={sliderRef}
        list={editorsPicks}
        onScroll={handleScroll}
        onMouseDown={(e) => {
          setClick(true);
          setStartX(e.clientX);
        }}
        onMouseUp={() => setClick(false)}
        onMouseMove={handleDrag}
        className='max-w-full scroll-smooth pb-6 select-none cursor-grab'
        card={(event) => (
          <EventCard
            venues={venues}
            event={event}
            showTime={false}
            cardSize='w-36 md:w-56'
          />
        )}
      />
    </HomeSection>
  );
};

export default EditorPicks;
