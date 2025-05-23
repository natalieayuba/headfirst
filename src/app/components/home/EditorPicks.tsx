'use client';
import React, { type RefObject } from 'react';
import HomeSectionTemplate from './HomeSectionTemplate';
import HorizontalScroll from '../HorizontalScroll';
import EventCard from '../EventCard';
import type { EventProps, VenueProps } from '@/db/schema';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import useElementVisible from '@/hooks/useElementVisible';

interface EditorPicksProps {
  events: EventProps[];
  venues: VenueProps[];
}

const EditorPicks = ({ events, venues }: EditorPicksProps) => {
  // const {
  //   sliderRef,
  //   handleScroll,
  //   SliderArrowLeft,
  //   SliderArrowRight,
  //   handleDragStart,
  //   cursor,
  // } = useHorizontalScroll();
  const editorsPicks = events.filter(({ editorsPick }) => editorsPick === true);
  // const { visible } = useElementVisible(sliderRef);

  const renderItem = (event: EventProps) => (
    <EventCard
      venue={venues.find(({ id }) => id === event.venueId)!}
      event={event}
      showTime={false}
      // savedEvents={savedEvents}
      // updateSavedEvents={updateSavedEvents}
      // cardSize='w-36 md:w-56'
      // className={`opacity-0${visible ? ' animate-fadeIn' : ''}`}
      // style={{
      //   animationDelay: `${75 * index + 1}ms`,
      //   animationFillMode: 'forwards',
      //   animationDuration: '200ms',
      // }}
    />
  );

  return (
    <HomeSectionTemplate
      heading="Our editors' top picks"
      description='Explore the best gigs and nights out in Bristol, curated by our editorial team.'
      // rightDiv={
      //   <div className='hidden xs:flex'>
      //     {SliderArrowLeft}
      //     {SliderArrowRight}
      //   </div>
      // }
    >
      <HorizontalScroll
        // id='slider'
        // ref={sliderRef as RefObject<HTMLOListElement>}
        list={editorsPicks}
        // onScroll={handleScroll}
        // onMouseDown={handleDragStart}
        // className={`max-w-full pb-6 select-none ${
        //   cursor === 'grab'
        //     ? ' [&_a]:cursor-grab'
        //     : cursor === 'grabbing'
        //       ? ' [&_a]:cursor-grabbing'
        //       : ''
        // }`}
        {...{ renderItem }}
      />
    </HomeSectionTemplate>
  );
};

export default EditorPicks;
