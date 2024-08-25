'use client';
import React from 'react';
import Icon from '../Icon';
import type { EventProps } from '../../data/data';
import { appendClassName } from '@/utils/formatting';

interface SaveButtonProps {
  event: EventProps;
  className?: string;
  size?: number;
}

const SaveButton = ({ event, className, size }: SaveButtonProps) => {
  return (
    <button
      type='button'
      onClick={() => (event.saved = !event.saved)}
      className={`bg-opacity-80 rounded-full${appendClassName(className)}`}
    >
      <Icon
        size={size}
        name={event.saved ? 'heart-filled' : 'heart'}
        className={event.saved ? 'text-lilac' : ''}
      />
    </button>
  );
};

export default SaveButton;
