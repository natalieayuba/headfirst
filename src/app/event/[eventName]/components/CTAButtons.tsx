'use client';
import React from 'react';
import SaveButton from '@/app/components/buttons/SaveButton';
import ShareButton from '@/app/components/buttons/ShareButton';

const CTAButtons = ({ eventId }: { eventId: string }) => (
  <div className='absolute bottom-2.5 right-2.5 flex gap-1'>
    <SaveButton eventId={eventId} className='circle-button-event' size={18} />
    <ShareButton />
  </div>
);

export default CTAButtons;
