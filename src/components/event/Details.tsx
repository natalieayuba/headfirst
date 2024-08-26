import type { EventProps } from '@/data/data';
import React from 'react';
import Icon from '../Icon';
import { formatDateRange, timeFormat } from '@/utils/formatting';
import { getSubcategoryById, getVenueById } from '@/data/utils';

const Details = ({ event }: { event: EventProps }) => {
  const details = [
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
      text:
        event.subcategoryIds?.length === 1
          ? getSubcategoryById(event.categoryId, event.subcategoryIds[0])?.name
          : event.subcategoryIds
              ?.map(
                (subcategoryId) =>
                  getSubcategoryById(event.categoryId, subcategoryId)?.name
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

  return (
    <ul className='clear-right'>
      {details.map(
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
  );
};

export default Details;
