'use client';
import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import Icon from './Icon';
import Lightbox from './Lightbox';
import useLightbox from '@/hooks/useLightbox';

interface DropdownProps {
  title: string;
  children: ReactNode;
  icon: string;
  selected: string;
}

const Dropdown = ({ title, children, icon, selected }: DropdownProps) => {
  const { isOpen, close, open } = useLightbox();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(0);

  useEffect(() => {
    if (buttonRef.current && isOpen) {
      setTop(buttonRef.current.offsetTop + buttonRef.current.offsetHeight + 8);
    }
  }, [isOpen]);

  useEffect(() => close(), [selected]);

  return (
    <div>
      {isOpen && (
        <Lightbox hideClose>
          <div
            ref={containerRef}
            className='bg-night rounded-xl p-6 shadow absolute right-6 left-6'
            style={{ top }}
          >
            {children}
          </div>
        </Lightbox>
      )}
      <button
        ref={buttonRef}
        type='button'
        className={`filter-chip relative${
          isOpen
            ? ' z-20 hover:bg-opacity-100 hover:bg-night hover:text-white-alpha-90'
            : ''
        }${selected !== '' ? ' bg-lilac text-dark-night font-medium' : ''}`}
        onClick={() => {
          if (!isOpen) open();
        }}
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
    </div>
  );
};

export default Dropdown;
