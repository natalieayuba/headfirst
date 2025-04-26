'use client';
import React, { type RefObject } from 'react';
import HomeSectionTemplate from './HomeSectionTemplate';
import Image from 'next/image';
import HorizontalScroll from '../HorizontalScroll';
import type { CategoryProps } from '@/db/schema';
import useElementVisible from '@/hooks/useElementVisible';
import useHorizontalScroll from '@/hooks/useHorizontalScroll';
import Link from 'next/link';
import Card from '../card/Card';

const Categories = ({ categories }: { categories: CategoryProps[] }) => {
  // const { visible, observedRef } = useElementVisible();
  // const {
  //   sliderRef,
  //   handleScroll,
  //   SliderArrowLeft,
  //   SliderArrowRight,
  //   handleDragStart,
  //   cursor,
  // } = useHorizontalScroll();

  const renderItem = (category: CategoryProps) => (
    <Card
      className='min-w-48'
      href={`/whats-on?categoryId=${category.id}`}
      image={{
        src: category.image,
        alt: `${category.name} background image`,
        aspectRatio: 1.5,
        showGradient: true,
      }}
      // {...{ visible }}
    >
      <h3 className='px-5 py-3 absolute bottom-0 text-lg md:px-6 [&&]:leading-5'>
        {category.name}
      </h3>
    </Card>
  );

  return (
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
        {...{ renderItem }}
      />
    </HomeSectionTemplate>
  );
};

export default Categories;
