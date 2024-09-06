'use client';
import React, { type RefObject } from 'react';
import HomeSection from './HomeSection';
import Image from 'next/image';
import HorizontalScroll from '../HorizontalScroll';
import Link from '../Link';
import type { CategoryProps } from '@/db/schema';
import useElementVisible from '@/hooks/useElementVisible';

const Categories = ({ categories }: { categories: CategoryProps[] }) => {
  const { visible, observedRef } = useElementVisible();

  const CategoryCard = ({ category }: { category: CategoryProps }) => (
    <Link
      href={`/whats-on?categoryId=${category.id}`}
      className={`group block w-48 md:w-auto aspect-[1.5] h-auto rounded-lg opacity-0 relative overflow-hidden${
        visible ? ' animate-fadeIn' : ''
      }`}
      style={{
        animationDelay: `${75 * Number(category.id.slice(-1))}ms`,
        animationFillMode: 'forwards',
        animationDuration: '200ms',
      }}
    >
      <Image
        src={category.image}
        fill
        sizes='100%'
        className='object-cover hovered-img'
        alt={`${category.name} background image`}
      />
      <div className='bg-gradient-to-b from-transparent to-dark-night to-[115%] w-full h-full absolute'></div>
      <h3 className='px-5 py-3 absolute bottom-0 md:text-lg md:px-6 [&&]:leading-5'>
        {category.name}
      </h3>
    </Link>
  );

  return (
    <HomeSection heading='Categories'>
      <HorizontalScroll
        ref={observedRef as RefObject<HTMLOListElement>}
        className='md:grid md:grid-flow-col md:grid-cols-4 md:w-full'
        list={categories}
        renderItem={(category) => <CategoryCard category={category} />}
      />
    </HomeSection>
  );
};

export default Categories;
