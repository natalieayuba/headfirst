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
  venue: VenueProps;
  category: CategoryProps;
}

const Details = ({ event, venue, category }: DetailsProps) => {
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
      text: venue.name,
    },
    {
      icon: 'tag',
      text: event.subcategoryIds
        .map(
          (subcategoryId) =>
            category.subcategories.find(({ id }) => id === subcategoryId)?.name
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
    <ul>
      {details.map(
        ({ icon, text }) =>
          text && (
            <li key={text} className='mb-1.5'>
              <Icon
                name={icon}
                size={18}
                className='inline-block mr-3 text-white opacity-60'
              />
              {text}
            </li>
          )
      )}
    </ul>
  );
};

export default Details;
