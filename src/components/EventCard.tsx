'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';
import { venues, type EventProps } from '../data/data';
import { formatDate, formatPrice, toUrl } from '@/utils/formatting';
import SaveButton from './buttons/SaveButton';

interface EventCardProps {
  event: EventProps;
  showTime?: boolean;
  horizontal?: boolean;
}

const EventCard = ({ event, showTime, horizontal }: EventCardProps) => {
  const { name, image, startDate, venueId, tickets } = event;

  return (
    <Link
      className={`group flex ${horizontal ? 'gap-3' : 'w-36 flex-col gap-2'}`}
      href={`/event/${toUrl(name)}`}
    >
      <div
        className={`${
          horizontal ? 'w-24' : 'w-36'
        } aspect-square h-auto relative overflow-hidden rounded-lg`}
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
        <h3 className='mb-1 leading-[110%]'>{name}</h3>
        <div className='flex secondary-text flex-col leading-tight'>
          <p>{formatDate(startDate, showTime)}</p>
          <p>{venues[venueId].name}</p>
          <p>{formatPrice(tickets)}</p>
        </div>
      </div>
      <SaveButton
        event={event}
        className={horizontal ? '' : 'z-10 absolute top-1 right-1 bg-night'}
        size={16}
      />
    </Link>
  );
};

export default EventCard;
