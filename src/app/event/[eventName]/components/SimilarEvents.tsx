'use client';
import React, { type RefObject } from 'react';
import HorizontalScroll from '../../../components/HorizontalScroll';
import EventCard from '../../../components/EventCard';
import type { EventProps, VenueProps } from '@/db/schema';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';

interface SimilarEventsProps {
  event: EventProps;
  events: EventProps[];
  venues: VenueProps[];
}

const SimilarEvents = ({ event, events, venues }: SimilarEventsProps) => {
  const max = 5;
  const similarEvents = events
    .filter(
      ({ id, categoryId, subcategoryIds }) =>
        categoryId === event.categoryId &&
        id !== event.id &&
        subcategoryIds?.some((subcategory) =>
          event.subcategoryIds?.includes(subcategory)
        )
    )
    .slice(0, max);
  const {
    sliderRef,
    handleScroll,
    SliderArrowLeft,
    SliderArrowRight,
    handleDragStart,
    cursor,
    maxScrollLeft,
  } = useHorizontalScroll();

  if (similarEvents.length < max) {
    similarEvents.push(
      ...events
        .filter(
          ({ id }) =>
            id !== event.id && !similarEvents.some((event) => event.id === id)
        )
        .filter(({ categoryId }) => categoryId === '1003')
        .sort(() => 0.5 - Math.random())
        .slice(0, max - similarEvents.length)
    );
    similarEvents.sort((a, b) => a.startDate.localeCompare(b.startDate));
  }

  return (
    <div className='py-10 md:py-12 mb-4'>
      <header className='content-container flex justify-between items-center mb-5 md:mb-6'>
        <h2 className='mb-0'>Other events you might like</h2>
        <div className='hidden xs:flex'>
          {SliderArrowLeft}
          {SliderArrowRight}
        </div>
      </header>

      <HorizontalScroll
        ref={sliderRef as RefObject<HTMLOListElement>}
        className={`md:grid md:grid-cols-5 md:gap-4 ${
          cursor === 'grab'
            ? ' [&_a]:cursor-grab'
            : cursor === 'grabbing'
              ? ' [&_a]:cursor-grabbing'
              : ''
        }`}
        list={similarEvents}
        onScroll={handleScroll}
        onMouseDown={handleDragStart}
        renderItem={(event) => (
          <EventCard
            venue={venues.find(({ id }) => id === event.venueId)!}
            event={event}
            cardSize='w-36 md:w-full'
          />
        )}
      />
    </div>
  );
};

export default SimilarEvents;
