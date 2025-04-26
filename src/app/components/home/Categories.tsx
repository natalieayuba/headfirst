'use client';
import React from 'react';
import HomeSectionTemplate from './HomeSectionTemplate';
import HorizontalScroll from '../HorizontalScroll';
import type { CategoryProps } from '@/db/schema';
import ThumbnailCard from '../ThumbnailCard';

const Categories = ({ categories }: { categories: CategoryProps[] }) => (
  <HomeSectionTemplate
    // ref={observedRef}
    heading='Categories'
    // rightDiv={
    //   <div className='hidden xs:flex'>
    //     {SliderArrowLeft}
    //     {SliderArrowRight}
    //   </div>
    // }
  >
    <HorizontalScroll
      // ref={sliderRef as RefObject<HTMLOListElement>}
      // onScroll={handleScroll}
      className='md:grid md:grid-flow-col md:grid-cols-4 md:w-full'
      list={categories}
      renderItem={(category: CategoryProps) => (
        <ThumbnailCard
          text={category.name}
          href={`/whats-on?categoryId=${category.id}`}
          src={category.image}
          alt={`${category.name} image`}
        />
      )}
    />
  </HomeSectionTemplate>
);

export default Categories;
