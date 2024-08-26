import Icon from '@/app/components/Icon';
import React from 'react';

interface FilterChipProps {
  text: string;
  name: string;
  value: string;
  selected: string;
  setSelected: (value: string) => void;
}

const FilterChip = ({
  text,
  name,
  value,
  selected,
  setSelected,
}: FilterChipProps) => {
  return (
    <div key={text} className='filter-chip'>
      <label htmlFor={text}>
        <input
          type='radio'
          id={text}
          name={name}
          className='hidden'
          value={value}
          checked={value === selected}
          onChange={(e) => setSelected(e.target.value)}
        />
        {text}
      </label>
      {value === selected && (
        <button
          type='button'
          className='p-0.5 opacity-50 hover:opacity-100 transition-opacity duration-100'
          onClick={() => setSelected('')}
        >
          <Icon name='close' size={12} />
        </button>
      )}
    </div>
  );
};

export default FilterChip;
