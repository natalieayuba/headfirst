import React from 'react';
import Icon from './Icon';

interface DropdownArrowProps {
  isOpen: boolean;
  size?: number;
}
const DropdownArrow = ({ isOpen, size = 16 }: DropdownArrowProps) => (
  <Icon
    name='angle-down'
    size={size}
    className={`transition-transform duration-200 ${
      isOpen ? 'rotate-180' : ''
    }`}
  />
);

export default DropdownArrow;
