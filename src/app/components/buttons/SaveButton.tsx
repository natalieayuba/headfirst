'use client';
import React, { useState, type MouseEvent } from 'react';
import Icon from '../Icon';
import { appendClassName } from '@/utils/formatting';
import type { EventProps } from '@/data/data';
import { colors } from '../../../../config';

interface SaveButtonProps {
  event: EventProps;
  className?: string;
  size?: number;
}

const SaveButton = ({ event, className, size }: SaveButtonProps) => {
  const [saved, setSaved] = useState(event.saved);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setSaved(!saved);
  };

  return (
    <button
      className={`bg-opacity-80 rounded-full${appendClassName(className)}`}
      onClick={handleClick}
    >
      <Icon
        size={size}
        name='heart'
        fill={saved ? colors.lilac : ''}
        className={saved ? 'text-lilac' : ''}
      />
    </button>
  );
};

export default SaveButton;
