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
  const { sliderRef, handleScroll, SliderArrows, handleDragStart, cursor } =
    useHorizontalScroll();

  const category = categories.find(
    ({ id }) => id === searchParams.get('categoryId')?.toString()
  );
  const [subcategories, setSubcategories] = useState<SubcategoryProps[]>(
    category ? category.subcategories : []
  );
  const fadedContainerRef = useRef<HTMLDivElement>(null);

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

      <div className='flex w-full'>
        <div
          className='md:fade-overflow-edge-left md:fade-overflow-edge-right w-full flex-1'
          ref={fadedContainerRef}
        >
          <HorizontalScroll
            ref={sliderRef}
            onMouseDown={handleDragStart}
            list={subcategories.toSorted((a, b) =>
              a.name.localeCompare(b.name)
            )}
            className={`[&&]:filter-chip-scroll mb-2 [&&]:flex-1 transition-transform duration-200 ${
              subcategories.length > 0 ? '' : '-translate-y-10 opacity-0'
            }`}
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
          <div className='ml-auto'>{SliderArrows}</div>
        </div>
      </div>
    </div>
  );
};

export default CategoryChips;
