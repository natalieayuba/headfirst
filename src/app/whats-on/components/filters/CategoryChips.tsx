'use client';
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from 'react';
import FilterChip from './FilterChip';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { CategoryProps, SubcategoryProps } from '@/db/schema';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import HorizontalScroll from '@/app/components/HorizontalScroll';

const CategoryChips = ({ categories }: { categories: CategoryProps[] }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoriesRef = useRef<HTMLDivElement>(null);

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
    if (!searchParams.has('categoryId') && categoriesRef.current) {
      setSubcategories([]);
      categoriesRef.current.scrollLeft = 0;
    }
  }, [searchParams]);

  return (
    <Suspense>
      <div className='flex gap-2 flex-col md:content-container relative '>
        <div className='filter-chip-scroll relative z-[2]' ref={categoriesRef}>
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

        <div className='relative'>
          {sliderRef.current && sliderRef.current.scrollLeft > 0 && (
            <div className='hidden md:block absolute -left-8 md:fade-overflow-edge-left h-8 z-10'>
              {SliderArrowLeft}
            </div>
          )}
          <HorizontalScroll
            ref={sliderRef as RefObject<HTMLOListElement>}
            onMouseDown={handleDragStart}
            list={subcategories.toSorted((a, b) =>
              a.name.localeCompare(b.name)
            )}
            className={`[&&]:filter-chip-scroll mb-2 transition-transform duration-200 ${
              cursor === 'grab'
                ? ' [&_label]:cursor-grab'
                : cursor === 'grabbing'
                ? ' [&_label]:cursor-grabbing'
                : ''
            } ${subcategories.length > 0 ? '' : ' -translate-y-10 opacity-0'}`}
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
            onScroll={handleScroll}
          />
          {sliderRef.current &&
            sliderRef.current.scrollLeft < maxScrollLeft && (
              <div className='hidden md:block absolute -right-8 top-0 md:fade-overflow-edge-right h-8 z-[2]'>
                {SliderArrowRight}
              </div>
            )}
        </div>
      </div>
    </Suspense>
  );
};

export default CategoryChips;
