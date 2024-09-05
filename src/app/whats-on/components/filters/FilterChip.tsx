import Icon from '@/app/components/Icon';
import Loader from '@/app/components/Loader';
import useLoader from '@/hooks/useLoader';
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
  const { loading, loadPage } = useLoader();
  return (
    <>
      {loading && <Loader />}
      <div
        key={text}
        className={`filter-chip ${
          selected === value
            ? 'filter-chip-selected'
            : 'hover:filter-chip-hovered'
        }`}
      >
        <label htmlFor={text} className='text-nowrap'>
          <input
            type='radio'
            id={text}
            name={name}
            className='hidden'
            value={value}
            checked={value === selected}
            onChange={(e) => loadPage(() => setSelected(e.target.value))}
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
    </>
  );
};

export default FilterChip;
