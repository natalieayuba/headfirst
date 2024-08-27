'use client';
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from '@/app/components/Icon';
import useClickOutside from '@/hooks/useClickOutside';

interface DropdownProps {
  title: string;
  children: ReactNode;
  icon: string;
  selected: string;
}

const FiltersDropdown = ({
  title,
  children,
  icon,
  selected,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  useClickOutside([popoverRef, triggerRef], closeDropdown);
  useEffect(closeDropdown, [selected]);

  return (
    <div>
      <button
        ref={triggerRef}
        className={`filter-chip ${
          selected
            ? 'relative z-[12] filter-chip-selected'
            : 'hover:filter-chip-hovered'
        }${isOpen ? ' relative z-[12]' : ''}`}
        onClick={toggleDropdown}
      >
        <Icon name={icon} size={16} />
        {selected !== '' ? selected : title}
        <Icon
          name='angle-down'
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <>
          <div
            ref={popoverRef}
            className='z-[11] mt-2 bg-night rounded-xl absolute p-6 left-6 right-6'
          >
            {children}
          </div>
          <div className='bg-dark-night bg-opacity-50 transition-opacity duration-150 fixed z-10 h-screen w-screen top-0 left-0'></div>
        </>
      )}
    </div>
  );
};

export default FiltersDropdown;
