'use client';
import React, { useState } from 'react';
import DropdownArrow from '../DropdownArrow';
import Icon from '../Icon';
import { appendClassName } from '@/utils/formatting';

const LanguageSelect = ({ className }: { className?: string }) => {
  const languages = ['English (GB)', 'English (US)', 'French', 'Spanish'];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  return (
    <div className={`relative${appendClassName(className)}`}>
      <button
        className='flex items-center gap-2'
        onClick={() => setIsOpen(!isOpen)}
      >
        <Icon name='language' size={14} className='' />
        {selected}
        <DropdownArrow isOpen={isOpen} size={14} />
      </button>
      {isOpen && (
        <ul className='absolute bottom-[130%] shadow-md rounded bg-night border border-lilac border-opacity-10 min-w-28 py-2'>
          {languages.map((language) => (
            <li key={language} className='h-8 px-2 flex items-center'>
              <button
                onClick={() => {
                  setSelected(language);
                  setIsOpen(false);
                }}
              >
                {language}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelect;
