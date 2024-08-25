import React, { useEffect, useRef, useState } from 'react';
import { categories, type SubcategoryProps } from '../../data/data';
import FilterChip from './FilterChip';
import { getCategoryById } from '@/data/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CategoryChips = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const category = getCategoryById(searchParams.get('categoryId')?.toString()!);
  const [subcategories, setSubcategories] = useState<SubcategoryProps[]>(
    category ? category.subcategories : []
  );
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  const onCategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams);
    if (id && subcategoriesRef.current) {
      const category = getCategoryById(id);
      params.set('categoryId', id);
      setSubcategories(category?.subcategories!);
      params.delete('subcategoryId');
      subcategoriesRef.current.scrollLeft = 0;
    } else {
      params.delete('categoryId');
      setSubcategories([]);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const onSubcategoryChange = (id: string) => {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('subcategoryId', id);
    } else {
      params.delete('subcategoryId');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.has('categoryId')) {
      setSubcategories([]);
    }
  }, [searchParams]);

  return (
    <div className='flex gap-2 flex-col'>
      <div className='filter-chip-scroll relative z-[2]'>
        {categories.map(({ id, name }) => (
          <FilterChip
            key={id}
            text={name}
            value={id}
            name='category'
            selected={searchParams.get('categoryId')?.toString() ?? ''}
            setSelected={onCategoryChange}
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
              selected={searchParams.get('subcategoryId')?.toString() ?? ''}
              setSelected={onSubcategoryChange}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryChips;
