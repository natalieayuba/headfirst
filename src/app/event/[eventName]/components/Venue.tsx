import React from 'react';
import Button from '../../../components/buttons/Button';
import Icon from '../../../components/Icon';
import type { VenueProps } from '@/db/schema';

const Venue = ({ venue }: { venue: VenueProps }) => (
  <div className='mt-10 md:mt-12'>
    <h2 className='mb-4'>Venue</h2>
    <div>
      <p>{venue.name}</p>
      <p className='secondary-text'>{venue.address}</p>
    </div>
    <Button
      style='secondary'
      className='mt-4 flex gap-2 items-center'
      href={venue.googleMapsLink!}
      external
    >
      <Icon name='location' size={16} />
      Open in maps
    </Button>
  </div>
);

export default Venue;
