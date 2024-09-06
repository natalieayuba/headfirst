import Icon from '@/app/components/Icon';
import Loader from '@/app/components/Loader';
import useAllowDrag from '@/hooks/useAllowDrag';
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
  const { handleClick, handleMouseDown, handleMouseLeave, handleMouseUp } =
    useAllowDrag();
  return (
    <>
      {loading && <Loader />}
      <label
        key={text}
        className={`filter-chip text-nowrap cursor-pointer ${
          selected === value
            ? 'filter-chip-selected'
            : 'hover:filter-chip-hovered'
        }`}
        htmlFor={text}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
      >
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
        {value === selected && (
          <button
            type='button'
            className='p-0.5 opacity-50 hover:opacity-100 transition-opacity duration-100'
            onClick={() => setSelected('')}
          >
            <Icon name='close' size={12} />
          </button>
        )}
      </label>
    </>
  );
};

export default FilterChip;
