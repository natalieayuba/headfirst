'use client';
import React from 'react';
import SaveButton from '@/app/components/buttons/SaveButton';
import ShareButton from '@/app/components/buttons/ShareButton';
import useLocalStorage from '@/hooks/useLocalStorage';

const CTAButtons = ({ eventId }: { eventId: string }) => {
  const [savedEvents, updateSavedEvents] = useLocalStorage('savedEvents', []);
  return (
    <div className='absolute bottom-2.5 right-2.5 flex gap-1'>
      <SaveButton
        eventId={eventId}
        className='circle-button-event'
        size={18}
        savedEvents={savedEvents}
        updateSavedEvents={updateSavedEvents}
      />
      <ShareButton />
    </div>
  );
};

export default CTAButtons;
