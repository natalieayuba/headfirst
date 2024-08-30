'use client';
import React, { useState, type MouseEvent } from 'react';
import Icon from '../Icon';
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
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <button className={className} onClick={handleClick}>
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
