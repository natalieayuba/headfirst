'use client';
import React from 'react';
import Icon from '../Icon';
import { colors } from '../../../../config';
import { appendClassName } from '@/utils/formatting';
import useLocalStorage from '@/hooks/useLocalStorage';

interface SaveButtonProps {
  eventId: string;
  className?: string;
  size?: number;
}

const SaveButton = ({ eventId, className, size }: SaveButtonProps) => {
  const [savedEvents, setEvents] = useLocalStorage('savedEvents', []);
  const saved = savedEvents ? savedEvents.includes(eventId) : false;

  const updateSavedEvents = () => {
    const updatedSavedEvents =
      savedEvents && savedEvents.includes(eventId)
        ? savedEvents.filter((id: string) => id !== eventId)
        : [...savedEvents, eventId];
    setEvents(updatedSavedEvents);
  };

  return (
    <button
      className={`circle-button${appendClassName(className)}`}
      onClick={updateSavedEvents}
    >
      <Icon
        size={size}
        name='heart'
        fill={saved ? colors.lilac : 'none'}
        className={saved ? 'text-lilac animate-heartbeat' : ''}
      />
    </button>
  );
};

export default SaveButton;
