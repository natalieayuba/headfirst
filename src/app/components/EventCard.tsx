'use client';
import NextImage from 'next/image';
import React from 'react';
import Link from 'next/link';
import { type EventProps, type VenueProps } from '../../db/schema';
import {
  appendClassName,
  formatDate,
  formatEventUrl,
  formatPriceRange,
} from '@/utils/formatting';
import SaveButton from './buttons/SaveButton';
import useAllowDrag from '@/hooks/useAllowDrag';
import Card from './card/Card';

interface EventCardProps {
  event: EventProps;
  venue: VenueProps;
  className?: string;
  imageSize?: string;
  cardSize?: string;
  horizontal?: boolean;
  narrow?: boolean;
  showTime?: boolean;
  showSaved?: boolean;
  showPrice?: boolean;
  onSelect?: () => void;
  animated?: boolean;
  savedEvents?: string[];
  updateSavedEvents?: (updatedEvents: string[]) => void;
}

const EventCard = ({
  event,
  venue,
  className,
  imageSize,
  cardSize,
  horizontal,
  narrow,
  onSelect,
  showSaved = true,
  showPrice = true,
  showTime = true,
  animated = true,
  ...rest
}: EventCardProps & Partial<Parameters<typeof Link>[0]>) => {
  // const { handleClick, handleMouseDown, handleMouseLeave, handleMouseUp } =
  //   useAllowDrag();
  return (
    <div className='relative'>
      <Card
        // {...rest}
        // className={`group flex relative${appendClassName(
        //   className
        // )}${appendClassName(cardSize)} ${
        //   horizontal ? 'gap-3' : 'flex-col gap-2 md:gap-2.5'
        // }`}
        className='w-36 md:w-56'
        href={`/event/${formatEventUrl(event.id, event.name)}`}
        // onSelect={onSelect}
        // draggable={false}
        // onClick={handleClick}
        // onMouseDown={handleMouseDown}
        // onMouseLeave={handleMouseLeave}
        // onMouseUp={handleMouseUp}
        image={{
          src: event.media[0].src,
          alt: `${event.name} image`,
          aspectRatio: 1,
          // imageSize,
          // animated
        }}
      >
        <div className='flex-1 mt-2.5'>
          <h3 className='line-clamp-2 leading-tight mb-0.5'>{event.name}</h3>
          <div className='flex secondary-text flex-col'>
            <p>{formatDate(event.startDate, showTime)}</p>
            <p className='line-clamp-1'>{venue.name}</p>
            {showPrice && <p>{formatPriceRange(event.tickets)}</p>}
          </div>
        </div>
      </Card>
      {showSaved && (
        <SaveButton
          eventId={event.id}
          className={
            horizontal
              ? 'relative [&&]:bg-opacity-0 [&&]:p-0'
              : 'absolute top-1 md:top-2 right-1 md:right-2'
          }
          size={15}
        />
      )}
    </div>
  );
};

export default EventCard;
