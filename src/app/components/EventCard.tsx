import Image from 'next/image';
import React from 'react';
import { type EventProps, type VenueProps } from '../../data/data';
import {
  formatDate,
  formatEventUrl,
  formatPriceRange,
} from '@/utils/formatting';
import SaveButton from './buttons/SaveButton';
import Link from './Link';

interface EventCardProps {
  event: EventProps;
  venues: VenueProps[];
  showTime?: boolean;
  horizontal?: boolean;
  showSaved?: boolean;
  hidePrice?: boolean;
  onSelect?: () => void;
  size?: 'xs' | 'sm' | 'md';
}

const EventCard = ({
  event,
  venues,
  showTime,
  horizontal,
  showSaved,
  hidePrice,
  onSelect,
  size = 'md',
}: EventCardProps) => {
  const { id, name, image, startDate, venueId, tickets } = event;
  const width = size === 'xs' ? 'w-14' : size === 'sm' ? 'w-24' : 'w-36';
  const venue = venues?.find(({ id }) => id === venueId);

  return (
    <Link
      className={`group flex relative ${
        horizontal ? 'gap-3' : `${width} flex-col gap-2`
      }`}
      href={`/event/${formatEventUrl(id, name)}`}
      onSelect={onSelect}
    >
      <div
        className={`${width} aspect-square h-fit relative overflow-hidden rounded-lg`}
      >
        <Image
          src={image}
          alt={`${name} image`}
          fill
          sizes='100%'
          className='md:group-hover:scale-105 duration-200 ease-out object-cover'
        />
      </div>
      <div className='flex-1'>
        <h3
          className={
            size === 'xs' ? 'leading-[112%] text-sm' : 'mb-1 leading-[110%]'
          }
        >
          {name}
        </h3>
        <div
          className={`flex secondary-text flex-col ${
            size === 'xs' ? 'leading-[112%]' : 'leading-tight'
          }`}
        >
          <p>{formatDate(startDate, showTime)}</p>
          <p>{venue?.name}</p>
          {!hidePrice && <p>{formatPriceRange(tickets)}</p>}
        </div>
      </div>
      {showSaved && (
        <SaveButton
          event={event}
          className={
            horizontal
              ? ''
              : 'absolute top-1 right-1 bg-night p-1.5 bg-opacity-80 rounded-full'
          }
          size={15}
        />
      )}
    </Link>
  );
};

export default EventCard;
