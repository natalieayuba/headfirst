import React from 'react';
import { ButtonLink } from '../buttons/Button';
import { getVenueById } from '@/data/utils';
import Icon from '../Icon';

const Venue = ({ venueId }: { venueId: string }) => (
  <div className='mt-8 mb-4'>
    <h2 className='mb-4'>Venue</h2>
    <div>
      <p>{getVenueById(venueId)?.name}</p>
      <p className='secondary-text leading-tight'>
        {getVenueById(venueId)?.address}
      </p>
    </div>
    <ButtonLink
      alt
      className='mt-4 flex gap-2 items-center'
      href={getVenueById(venueId)?.googleMapsLink!}
      external
    >
      <Icon name='location' size={16} />
      Open in maps
    </ButtonLink>
  </div>
);

export default Venue;
