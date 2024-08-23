import React, { useEffect, useRef, useState } from 'react';
import { categories, type SubcategoryProps } from '../../data/data';
import FilterChip from './FilterChip';
import type { AddFilterProps } from '@/app/whats-on/page';
import { getCategoryById } from '@/data/utils';

const CategoryChips = ({ addFilter }: AddFilterProps) => {
  const [categoryId, setCategoryId] = useState('');
  const [subcategories, setSubcategories] = useState<SubcategoryProps[]>([]);
  const [subcategoryId, setSubcategoryId] = useState('');
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    addFilter('categoryId', categoryId);
    const category = getCategoryById(categoryId);
    if (category && subcategoriesRef.current) {
      setSubcategories(category.subcategories);
      subcategoriesRef.current.scrollLeft = 0;
      setSubcategoryId('');
    } else {
      setSubcategories([]);
    }
  }, [categoryId]);

  useEffect(() => addFilter('subcategoryId', subcategoryId), [subcategoryId]);

  return (
    <div className='flex gap-2 flex-col'>
      <div className='filter-chip-scroll relative z-[2]'>
        {categories.map(({ id, name }) => (
          <FilterChip
            key={id}
            text={name}
            value={id}
            name='category'
            selected={categoryId}
            setSelected={setCategoryId}
          />
        ))}
      </div>
      <div
        className={`filter-chip-scroll relative transition-all duration-200 ${
          subcategories.length > 0 ? '' : '-translate-y-10 opacity-0'
        }`}
        ref={subcategoriesRef}
      >
        {subcategories
          .toSorted((a, b) => a.name.localeCompare(b.name))
          .map(({ id, name }) => (
            <FilterChip
              key={id}
              text={name}
              value={id}
              name='subcategory'
              selected={subcategoryId}
              setSelected={setSubcategoryId}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryChips;
