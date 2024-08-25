'use client';
import React from 'react';
import { notFound } from 'next/navigation';
import {
  formatDateRange,
  formatEventUrl,
  formatPrice,
  timeFormat,
} from '@/utils/formatting';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Image from 'next/image';
import SaveButton from '@/components/buttons/SaveButton';
import ShareButton from '@/components/buttons/ShareButton';
import Divider from '@/components/Divider';
import { Button, ButtonLink } from '@/components/buttons/Button';
import HorizontalScroll from '@/components/HorizontalScroll';
import EventCard from '@/components/EventCard';
import CopyAddressButton from '@/components/buttons/CopyAddressButton';
import { events, type EventProps } from '@/data/data';
import {
  getCategoryById,
  getSubcategoryById,
  getVenueById,
} from '@/data/utils';

const Event = ({ params }: { params: { eventName: string } }) => {
  const event = events.find(
    ({ id, name }) =>
      formatEventUrl(id, name) === decodeURIComponent(params.eventName)
  );

  if (!event) {
    notFound();
  }

  const breadcrumbs = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Events',
      url: '/whats-on',
    },
    {
      name: getCategoryById(event.categoryId)?.name,
      url: `/whats-on?categoryId=${event.categoryId}`,
    },
  ];

  const summary = [
    {
      icon: 'clock',
      text: formatDateRange(event.startDate, event.endDate),
    },
    {
      icon: 'location',
      text: getVenueById(event.venueId)?.name,
    },
    {
      icon: 'tag',
      text: event.subcategoryIds
        ?.map((subcategoryId) =>
          getSubcategoryById(event.categoryId, subcategoryId)
        )
        .join(', '),
    },
    {
      icon: 'info',
      text: `${event.ageLimit ? `${event.ageLimit}+ event, ` : ''}${
        event.lastEntry ? `last entry ${timeFormat(event.lastEntry)}` : ''
      }`,
    },
  ];

  const similarEvents = events
    .filter(
      ({ id, categoryId, subcategoryIds }) =>
        categoryId === event.categoryId &&
        id !== event.id &&
        subcategoryIds?.some((subcategory) =>
          event.subcategoryIds?.includes(subcategory)
        )
    )
    .slice(0, 10);

  const card = (event: EventProps) => <EventCard event={event} showTime />;

  return (
    <div className='pt-16'>
      <div>
        <nav>
          <ul className='pt-1 px-6'>
            {breadcrumbs.map(({ name, url }, index) => (
              <li
                key={name}
                className={`inline-block font-medium ${
                  index !== breadcrumbs.length - 1
                    ? 'text-white-alpha-60'
                    : 'text-lilac'
                }`}
              >
                <Link href={url}>{name}</Link>
                {index !== breadcrumbs.length - 1 && (
                  <Icon
                    size={12}
                    name='angle-right'
                    className='inline-block mx-2'
                  />
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className='p-6 pt-4'>
          <div className='w-full aspect-square relative'>
            <Image
              src={event.image}
              alt={`${event.name} image`}
              fill
              sizes='100%'
              className='object-cover rounded-lg'
            />
          </div>
          <div className='mt-5 flex'>
            <h1 className='text-4xl font-medium'>{event.name}</h1>
            <div className='flex gap-2 h-fit mt-2 ml-auto'>
              <SaveButton event={event} />
              <ShareButton />
            </div>
          </div>
          <ul>
            {summary.map(
              ({ icon, text }) =>
                text && (
                  <li key={text} className='mb-1'>
                    <Icon
                      name={icon}
                      size={16}
                      className='text-white-alpha-60 inline-block mr-3'
                    />
                    {text}
                  </li>
                )
            )}
          </ul>
          <Divider className='w-28 mx-auto' />
          <div>
            <h2>About this event</h2>
            <p className='text-white-alpha-60'>{event.about}</p>
          </div>
          <div className='mt-8 mb-4'>
            <h2>Venue</h2>
            <CopyAddressButton venue={getVenueById(event.venueId)} />
            <ButtonLink
              alt
              className='mt-4 flex gap-2'
              href={getVenueById(event.venueId)?.googleMapsLink || ''}
              external
              onClick={() => ''}
            >
              <Icon name='location' size={16} />
              Open in maps
            </ButtonLink>
          </div>
        </div>
        <div className='bg-night px-6 py-4 flex justify-between items-center sticky bottom-0'>
          <p className='text-2xl font-medium'>{formatPrice(event.tickets)}</p>
          <Button onClick={() => ''}>Get tickets </Button>
        </div>
      </div>
      <div className='px-6 pt-8 pb-8'>
        <h2 className='mb-5'>Other events you might like</h2>
        <HorizontalScroll list={similarEvents} card={card} />
      </div>
    </div>
  );
};

export default Event;
