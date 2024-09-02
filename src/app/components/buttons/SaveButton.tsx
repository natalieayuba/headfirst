'use client';
import React, { useState, type MouseEvent } from 'react';
import Icon from '../Icon';
import { colors } from '../../../../config';
import { appendClassName } from '@/utils/formatting';

interface SaveButtonProps {
  className?: string;
  size?: number;
}

const SaveButton = ({ className, size }: SaveButtonProps) => {
  const [saved, setSaved] = useState(false);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  return (
    <button
      className={`circle-button${appendClassName(className)}`}
      onClick={handleClick}
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
