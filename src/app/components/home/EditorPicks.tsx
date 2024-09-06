'use client';
import React from 'react';
import HomeSection from './HomeSection';
import HorizontalScroll from '../HorizontalScroll';
import EventCard from '../EventCard';
import type { EventProps, VenueProps } from '@/db/schema';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import useElementVisible from '@/hooks/useElementVisible';
import useLocalStorage from '@/hooks/useLocalStorage';

interface EditorPicksProps {
  events: EventProps[];
  venues: VenueProps[];
}

const EditorPicks = ({ events, venues }: EditorPicksProps) => {
  const {
    sliderRef,
    handleScroll,
    SliderArrowLeft,
    SliderArrowRight,
    handleDragStart,
    cursor,
  } = useHorizontalScroll();
  const editorsPicks = events.filter(({ editorsPick }) => editorsPick === true);
  const { visible } = useElementVisible(sliderRef);
  const [savedEvents, updateSavedEvents] = useLocalStorage('savedEvents', []);

  return (
    <HomeSection
      heading="Our editors' top picks"
      caption='Explore the best gigs and nights out in Bristol, curated by our editorial team.'
      rightDiv={
        <div className='hidden md:block'>
          {SliderArrowLeft}
          {SliderArrowRight}
        </div>
      }
    >
      <HorizontalScroll
        id='slider'
        ref={sliderRef}
        list={editorsPicks}
        onScroll={handleScroll}
        onMouseDown={handleDragStart}
        className={`max-w-full pb-6 select-none ${
          cursor === 'grab'
            ? ' [&_a]:cursor-grab'
            : cursor === 'grabbing'
            ? ' [&_a]:cursor-grabbing'
            : ''
        }`}
        renderItem={(event, index) => (
          <EventCard
            venues={venues}
            event={event}
            showTime={false}
            savedEvents={savedEvents}
            updateSavedEvents={updateSavedEvents}
            cardSize='w-36 md:w-56'
            className={`opacity-0${visible ? ' animate-fadeIn' : ''}`}
            style={{
              animationDelay: `${75 * index + 1}ms`,
              animationFillMode: 'forwards',
              animationDuration: '200ms',
            }}
          />
        )}
      />
    </HomeSection>
  );
};

export default EditorPicks;
