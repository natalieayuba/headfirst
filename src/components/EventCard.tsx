'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import type { EventProps } from './EventProps';
import moment from 'moment';
import Link from 'next/link';
import { IoMdHeartEmpty, IoMdHeart } from 'react-icons/io';

const EventCard = (event: EventProps) => {
  const { images, title, startDate, venue, tickets, saved } = event;
  const [saveEvent, setSaveEvent] = useState(false);
  const minPrice = tickets.reduce((a, b) => (a.price < b.price ? a : b)).price;
  const maxPrice = tickets.reduce((a, b) => (a.price > b.price ? a : b)).price;
  const formatDate = (date: string) =>
    moment(date).format(
      `ddd Do MMM, ${new Date(date).getMinutes() > 0 ? 'h:mma' : 'ha'}`
    );

  useEffect(() => {
    event.saved = saveEvent;
  }, [event, saveEvent]);

  return (
    // when card hovered, we want image to zoom in slightly?
    <Link className='group block w-40' href='#'>
      <div className='w-full aspect-square h-auto relative mb-3 overflow-hidden rounded-lg'>
        <Image
          src={images[0]}
          alt={`${title} 01`}
          fill
          sizes='100vw'
          className='group-hover:scale-105 duration-300 ease-out'
        />
        <button
          className='z-10 absolute bg-darkest-purple bg-opacity-60 p-2 rounded-full bottom-1 right-1'
          onClick={() => setSaveEvent(!saveEvent)}
        >
          <span className='text-lg'>
            {saved ? <IoMdHeart /> : <IoMdHeartEmpty />}
          </span>
        </button>
      </div>
      <h3 className='mb-1 line-clamp-2 overflow-ellipsis'>{title}</h3>
      <div className='text-sm text-white-alpha-60 flex flex-col'>
        <p>{formatDate(startDate)}</p>
        <p>{venue.name}</p>
        <p>
          £{minPrice} - £{maxPrice}
        </p>
      </div>
    </Link>
  );
};

export default EventCard;
