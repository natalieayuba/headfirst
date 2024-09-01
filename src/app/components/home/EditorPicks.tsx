'use client';
import React, { useRef, useState, type MouseEvent, type UIEvent } from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import EventCard from '../EventCard';
import type { EventProps, VenueProps } from '@/db/schema';
import SliderArrow from '../SliderArrow';

interface EditorPicksProps {
  events: EventProps[];
  venues: VenueProps[];
}

const EditorPicks = ({ events, venues }: EditorPicksProps) => {
  const sliderRef = useRef<HTMLOListElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [maxScrollWidth, setMaxScrollWidth] = useState(0);
  const editorsPicks = events.filter(({ editorsPick }) => editorsPick === true);
  const [click, setClick] = useState(false);
  const [startX, setStartX] = useState(0);
  const [cursor, setCursor] = useState('pointer');

  const handleScroll = (e: UIEvent) => {
    const maxScrollLeft =
      e.currentTarget.scrollWidth - e.currentTarget.clientWidth;
    setMaxScrollWidth(maxScrollLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  };

  const handleDrag = (e: MouseEvent) => {
    if (click) {
      e.preventDefault();
      e.currentTarget.scrollLeft -= e.clientX - startX * 2;
      setCursor('grabbing');
      document.body.style.cursor = 'grabbing';
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
            scrollLeft={scrollLeft!}
          />
          <SliderArrow
            direction='right'
            sliderRef={sliderRef}
            scrollLeft={scrollLeft!}
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
          e.preventDefault();
          setClick(true);
          setStartX(e.clientX);
        }}
        onMouseUp={() => {
          setClick(false);
          document.body.style.cursor = 'auto';
          setCursor('auto');
        }}
        onMouseMove={handleDrag}
        className={`max-w-full scroll-smooth pb-6 select-none${
          cursor === 'grabbing' ? ' [&_a]:cursor-grabbing' : ''
        }`}
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
