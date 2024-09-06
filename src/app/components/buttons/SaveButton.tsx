'use client';
import React, { type MouseEvent } from 'react';
import Icon from '../Icon';
import { colors } from '../../../../config';
import { appendClassName } from '@/utils/formatting';

interface SaveButtonProps {
  eventId: string;
  className?: string;
  size?: number;
  savedEvents: string[];
  updateSavedEvents: (updatedEvents: string[]) => void;
}

const SaveButton = ({
  savedEvents,
  updateSavedEvents,
  eventId,
  className,
  size,
}: SaveButtonProps) => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    updateSavedEvents(
      savedEvents.includes(eventId)
        ? savedEvents.filter((id: string) => id !== eventId)
        : [...savedEvents, eventId]
    );
  };

  return (
    <button
      className={`circle-button${appendClassName(className)}`}
      onClick={handleClick}
    >
      <Icon
        size={size}
        name='heart'
        fill={savedEvents.includes(eventId) ? colors.lilac : 'none'}
        className={
          savedEvents.includes(eventId) ? 'text-lilac animate-heartbeat' : ''
        }
      />
    </button>
  );
};

export default SaveButton;
