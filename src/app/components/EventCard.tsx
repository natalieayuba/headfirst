import NextImage from 'next/image';
import React from 'react';
import { type EventProps, type VenueProps } from '../../db/schema';
import {
  appendClassName,
  formatDate,
  formatEventUrl,
  formatPriceRange,
} from '@/utils/formatting';
import SaveButton from './buttons/SaveButton';
import Link from './Link';

interface EventCardProps {
  event: EventProps;
  venues: VenueProps[];
  imageSize?: string;
  cardSize?: string;
  horizontal?: boolean;
  narrow?: boolean;
  showTime?: boolean;
  showSaved?: boolean;
  showPrice?: boolean;
  onSelect?: () => void;
  animated?: boolean;
}

interface ImageProps extends Partial<EventCardProps> {
  animated?: boolean;
}

export const Image = ({
  src,
  alt,
  animated,
  imageSize,
}: ImageProps & Parameters<typeof NextImage>[0]) => (
  <div
    className={`aspect-square h-auto relative overflow-hidden rounded-lg${appendClassName(
      imageSize
    )}`}
  >
    <NextImage
      src={src}
      fill
      alt={alt}
      sizes='100%'
      draggable={false}
      className={`object-cover${animated ? ' hovered-img' : ''}`}
    />
  </div>
);

interface ContentProps extends Partial<EventCardProps> {
  event: EventProps;
  venue: VenueProps;
}

const Content = ({
  event,
  venue,
  showTime,
  showPrice,
  narrow,
}: ContentProps) => (
  <div className='flex-1'>
    <h3
      className={`line-clamp-2 ${narrow ? 'text-sm leading-[120%]' : 'mb-0.5'}`}
    >
      {event.name}
    </h3>
    <div
      className={`flex secondary-text flex-col ${
        narrow ? 'leading-[120%]' : ''
      }`}
    >
      <p>{formatDate(event.startDate, showTime)}</p>
      <p className='line-clamp-1'>{venue.name}</p>
      {showPrice && <p>{formatPriceRange(event.tickets)}</p>}
    </div>
  </div>
);

const EventCard = ({
  event,
  venues,
  imageSize,
  cardSize,
  horizontal,
  narrow,
  onSelect,
  showSaved = true,
  showPrice = true,
  showTime = true,
  animated = true,
}: EventCardProps) => {
  const venue = venues?.find(({ id }) => id === event.venueId);
  return (
    <Link
      className={`group flex relative${appendClassName(cardSize)} ${
        horizontal ? 'gap-3' : 'flex-col gap-2 md:gap-2.5'
      }`}
      href={`/event/${formatEventUrl(event.id, event.name)}`}
      onSelect={onSelect}
      draggable={false}
    >
      <Image
        src={event.media[0].src}
        alt={`${event.name} image`}
        imageSize={imageSize}
        animated={animated}
      />
      <Content
        event={event}
        venue={venue!}
        showTime={showTime}
        showPrice={showPrice}
        narrow={narrow}
      />
      {showSaved && (
        <SaveButton
          className={
            horizontal
              ? 'relative [&&]:bg-opacity-0 [&&]:p-0'
              : 'absolute top-1 md:top-2 right-1 md:right-2'
          }
          size={15}
        />
      )}
    </Link>
  );
};

export default EventCard;
