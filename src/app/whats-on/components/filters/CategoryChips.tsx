'use client';
import React, { useEffect, useRef, useState, type UIEvent } from 'react';
import FilterChip from './FilterChip';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CategoryProps, SubcategoryProps } from '@/db/schema';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import HorizontalScroll from '@/app/components/HorizontalScroll';

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
  const {
    sliderRef,
    handleScroll,
    SliderArrowLeft,
    SliderArrowRight,
    handleDragStart,
    cursor,
    maxScrollLeft,
  } = useHorizontalScroll(subcategories);

  const updateCategoryParam = (id: string) => {
    const params = new URLSearchParams(searchParams);
    if (id && sliderRef.current) {
      const category = categories.find((category) => category.id === id);
      params.set('categoryId', id);
      setSubcategories(category?.subcategories!);
      params.delete('subcategoryId');
      sliderRef.current.scrollLeft = 0;
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

  const scroll = (e: UIEvent) => {
    handleScroll();
    if (
      sliderRef.current &&
      sliderRef.current.clientWidth < sliderRef.current.scrollWidth
    ) {
      if (sliderRef.current.scrollLeft === 0) {
        sliderRef.current.classList.remove('before:opacity-100');
      } else {
        sliderRef.current.classList.add('before:opacity-100');
      }
      if (
        sliderRef.current.scrollLeft ===
        sliderRef.current.scrollWidth - sliderRef.current.clientWidth
      ) {
        sliderRef.current.classList.add('after:opacity-0');
      } else {
        sliderRef.current.classList.remove('after:opacity-0');
      }
    }
  };

  return (
    <div className='flex gap-2 flex-col md:content-container relative '>
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

      <div className='flex w-full flex-1 '>
        {sliderRef.current?.scrollLeft! > 0 && (
          <div className='absolute left-2 md:fade-overflow-edge-left h-8 z-10'>
            {SliderArrowLeft}
          </div>
        )}
        <HorizontalScroll
          ref={sliderRef}
          onMouseDown={handleDragStart}
          list={subcategories.toSorted((a, b) => a.name.localeCompare(b.name))}
          className={`relative [&&]:filter-chip-scroll mb-2 [&&]:flex-1 transition-transform duration-200 ${
            cursor === 'grab'
              ? ' [&_label]:cursor-grab'
              : cursor === 'grabbing'
              ? ' [&_label]:cursor-grabbing'
              : ''
          } ${subcategories.length > 0 ? '' : '-translate-y-10 opacity-0'}`}
          renderItem={(item) => (
            <FilterChip
              key={item.id}
              text={item.name}
              value={item.id}
              name='subcategory'
              selected={searchParams.get('subcategoryId')?.toString() ?? ''}
              setSelected={updateSubcategoryParam}
            />
          )}
          onScroll={scroll}
        />
        {sliderRef.current?.clientWidth! !== sliderRef.current?.scrollWidth! &&
          sliderRef.current?.scrollLeft! !== maxScrollLeft && (
            <div className='absolute right-2 md:fade-overflow-edge-right h-8 z-10'>
              {SliderArrowRight}
            </div>
          )}
      </div>
    </div>
  );
};

export default CategoryChips;
