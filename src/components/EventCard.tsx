'use client';
import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import { type EventProps } from '../data/data';
import { formatDate, formatEventUrl, formatPrice } from '@/utils/formatting';
import SaveButton from './buttons/SaveButton';
import { getVenueById } from '@/data/utils';

interface EventCardProps {
  event: EventProps;
  showTime?: boolean;
  horizontal?: boolean;
  showSaved?: boolean;
  hidePrice?: boolean;
  onClick?: () => void;
  size?: 'xs' | 'sm' | 'md';
}

const EventCard = ({
  event,
  showTime,
  horizontal,
  showSaved,
  hidePrice,
  onClick,
  size = 'md',
}: EventCardProps) => {
  const { id, name, image, startDate, venueId, tickets } = event;
  const width = size === 'xs' ? 'w-14' : size === 'sm' ? 'w-24' : 'w-36';

  return (
    <Link
      className={`group flex relative ${
        horizontal ? 'gap-3' : `${width} flex-col gap-2`
      }`}
      href={`/event/${formatEventUrl(id, name)}`}
      onClick={onClick}
      onMouseDown={(e) => e.preventDefault()}
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
          <p>{getVenueById(venueId)?.name}</p>
          {!hidePrice && <p>{formatPrice(tickets)}</p>}
        </div>
      </div>
      {showSaved && (
        <SaveButton
          saved={event.saved}
          className={horizontal ? '' : 'absolute top-1 right-1 bg-night p-2'}
          size={16}
        />
      )}
    </Link>
  );
};

export default EventCard;
