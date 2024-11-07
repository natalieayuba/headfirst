'use client';
import React, { useState, type ReactNode } from 'react';
import Icon from './Icon';
import DropdownArrow from './DropdownArrow';

interface AccordianProps {
  heading: string;
  content: ReactNode;
}

const Accordian = ({ heading, content }: AccordianProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      key={heading}
      className='border-t last:border-b border-lilac border-opacity-10'
    >
      <button
        className='min-h-16 w-full flex items-center gap-3 justify-between container-mx'
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className='font-medium'>{heading}</h3>
        <DropdownArrow isOpen={isOpen} />
      </button>
      {isOpen && (
        <div className='container-mx pb-6 text-white text-opacity-80'>
          {Array.isArray(content) ? (
            <ul className='flex flex-col gap-4'>
              {content.map((text) => (
                <li key={text}>{text}</li>
              ))}
            </ul>
          ) : (
            content
          )}
        </div>
      )}
    </div>
  );
};

export default Accordian;
