import React from 'react';
import Icon from '../../../components/Icon';
import {
  toSentenceCase,
  formatDateRange,
  timeFormat,
} from '@/utils/formatting';
import type { CategoryProps, EventProps, VenueProps } from '@/db/schema';

interface DetailsProps {
  event: EventProps;
  venues: VenueProps[];
  categories: CategoryProps[];
}

const Details = ({ event, venues, categories }: DetailsProps) => {
  const ageLimit = event.ageLimit ? `${event.ageLimit}+ event` : '';
  const lastEntry = event.lastEntry
    ? `last entry ${timeFormat(event.lastEntry)}`
    : '';

  const details = [
    {
      icon: 'clock',
      text: formatDateRange(event.startDate, event.endDate),
    },
    {
      icon: 'location',
      text: venues.find(({ id }) => id === event.venueId)?.name,
    },
    {
      icon: 'tag',
      text: event.subcategoryIds
        .map(
          (subcategoryId) =>
            categories
              ?.find(({ id }) => id === event.categoryId)
              ?.subcategories.find(({ id }) => id === subcategoryId)?.name
        )
        .join(', '),
    },
    {
      icon: 'info',
      text:
        ageLimit && lastEntry
          ? `${ageLimit}, ${lastEntry}`
          : ageLimit
          ? ageLimit
          : toSentenceCase(lastEntry),
    },
  ];

  return (
    <ul className='clear-right'>
      {details.map(
        ({ icon, text }) =>
          text && (
            <li key={text} className='mb-2'>
              <Icon name={icon} size={18} className='inline-block mr-3' />
              {text}
            </li>
          )
      )}
    </ul>
  );
};

export default Details;
