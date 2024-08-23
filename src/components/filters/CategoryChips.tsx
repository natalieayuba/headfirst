import React, { useEffect, useRef, useState } from 'react';
import { categories } from '../../data/data';
import FilterChip from './FilterChip';
import type { FilterProps } from '@/app/whats-on/page';

const CategoryChips = ({ filter }: FilterProps) => {
  const [category, setCategory] = useState('');
  const [subcategories, setSubcategories] = useState<string[]>([]);
  const [subcategory, setSubcategory] = useState('');
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    filter('category', category);
    const found = categories.find(({ name }) => name === category);
    if (found && subcategoriesRef.current) {
      setSubcategory('');
      setSubcategories(found.subcategories);
      subcategoriesRef.current.scrollLeft = 0;
    } else {
      setSubcategories([]);
    }
  }, [category]);

  useEffect(() => {
    filter('subcategory', subcategory);
  }, [subcategory]);

  return (
    <div className='flex gap-2 flex-col'>
      <div className='filter-chip-scroll'>
        {categories.map(({ name }) => (
          <FilterChip
            key={name}
            text={name}
            name='category'
            selected={category}
            setSelected={setCategory}
          />
        ))}
      </div>
      <div className='filter-chip-scroll' ref={subcategoriesRef}>
        {subcategories.toSorted().map((name) => (
          <FilterChip
            key={name}
            text={name}
            name='subcategory'
            selected={subcategory}
            setSelected={setSubcategory}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryChips;
