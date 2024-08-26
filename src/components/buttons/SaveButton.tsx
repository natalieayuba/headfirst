import React from 'react';
import Icon from '../Icon';
import { appendClassName } from '@/utils/formatting';

interface SaveButtonProps {
  saved: boolean;
  className?: string;
  size?: number;
}

const SaveButton = ({ saved, className, size }: SaveButtonProps) => (
  <button
    type='button'
    onClick={() => (saved = !saved)}
    className={`bg-opacity-80 rounded-full${appendClassName(className)}`}
  >
    <Icon
      size={size}
      name={saved ? 'heart-filled' : 'heart'}
      className={saved ? 'text-lilac' : ''}
    />
  </button>
);

export default SaveButton;
