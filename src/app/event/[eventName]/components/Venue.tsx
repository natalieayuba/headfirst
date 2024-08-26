import React from 'react';
import { ButtonLink } from '../../../components/buttons/Button';
import Icon from '../../../components/Icon';
import type { VenueProps } from '@/data/data';

interface VenueSectionProps {
  venueId: string;
  venues: VenueProps[];
}

const Venue = ({ venueId, venues }: VenueSectionProps) => (
  <div className='mt-8 mb-4'>
    <h2 className='mb-4'>Venue</h2>
    <div>
      <p>{venues.find(({ id }) => id === venueId)?.name}</p>
      <p className='secondary-text leading-tight'>
        {venues.find(({ id }) => id === venueId)?.address}
      </p>
    </div>
    <ButtonLink
      alt
      className='mt-4 flex gap-2 items-center'
      href={venues.find(({ id }) => id === venueId)?.googleMapsLink!}
      external
    >
      <Icon name='location' size={16} />
      Open in maps
    </ButtonLink>
  </div>
);

export default Venue;
