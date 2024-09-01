'use client';
import React, { useEffect, useRef, useState } from 'react';
import FilterChip from './FilterChip';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CategoryProps, SubcategoryProps } from '@/db/schema';

const CategoryChips = ({ categories }: { categories: CategoryProps[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const category = categories.find(
    ({ id }) => id === searchParams.get('categoryId')?.toString()
  );
  const [subcategories, setSubcategories] = useState<SubcategoryProps[]>(
    category ? category.subcategories : []
  );
  const fadedContainerRef = useRef<HTMLDivElement>(null);
  const subcategoriesRef = useRef<HTMLDivElement>(null);

  const updateCategoryParam = (id: string) => {
    const params = new URLSearchParams(searchParams);
    if (id && subcategoriesRef.current) {
      const category = categories.find((category) => category.id === id);
      params.set('categoryId', id);
      setSubcategories(category?.subcategories!);
      params.delete('subcategoryId');
      subcategoriesRef.current.scrollLeft = 0;
    } else {
      params.delete('categoryId');
      params.delete('subcategoryId');
      setSubcategories([]);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const updateSubcategoryParam = (id: string) => {
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
    <div
      ref={fadedContainerRef}
      className='flex gap-2 flex-col md:content-container relative md:fade-overflow-edge-left md:fade-overflow-edge-right'
    >
      <div className='filter-chip-scroll relative z-[2]'>
        {categories.map(({ id, name }) => (
          <FilterChip
            key={id}
            text={name}
            value={id}
            name='category'
            selected={searchParams.get('categoryId')?.toString() ?? ''}
            setSelected={updateCategoryParam}
          />
        ))}
      </div>
      <div
        className={`filter-chip-scroll transition-all duration-200 mb-2 ${
          subcategories.length > 0 ? '' : '-translate-y-10 opacity-0'
        }`}
        ref={subcategoriesRef}
        onScroll={(e) => {
          if (e.currentTarget.clientWidth < e.currentTarget.scrollWidth) {
            if (e.currentTarget.scrollLeft === 0) {
              fadedContainerRef.current?.classList.remove('before:opacity-100');
            } else {
              fadedContainerRef.current?.classList.add('before:opacity-100');
            }
            if (
              e.currentTarget.scrollLeft ===
              e.currentTarget.scrollWidth - e.currentTarget.clientWidth
            ) {
              fadedContainerRef.current?.classList.add('after:opacity-0');
            } else {
              fadedContainerRef.current?.classList.remove('after:opacity-0');
            }
          }
        }}
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
              setSelected={updateSubcategoryParam}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryChips;
