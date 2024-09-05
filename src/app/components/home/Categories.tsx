import React from 'react';
import HomeSection from './HomeSection';
import Image from 'next/image';
import HorizontalScroll from '../HorizontalScroll';
import Link from '../Link';
import type { CategoryProps } from '@/db/schema';

const CategoryCard = ({ category }: { category: CategoryProps }) => (
  <Link
    href={`/whats-on?categoryId=${category.id}`}
    className='group block w-48 md:w-auto aspect-[1.5] h-auto rounded-lg relative overflow-hidden'
  >
    <Image
      src={category.image}
      fill
      sizes='100%'
      className='object-cover hovered-img'
      alt={`${category.name} background image`}
    />
    <div className='bg-gradient-to-b from-transparent to-dark-night to-[115%] w-full h-full absolute'></div>
    <h3 className='px-5 py-2.5 absolute bottom-0 md:text-lg md:px-6'>
      {category.name}
    </h3>
  </Link>
);

const Categories = ({ categories }: { categories: CategoryProps[] }) => {
  return (
    <HomeSection heading='Categories'>
      <HorizontalScroll
        className='md:grid md:grid-flow-col md:grid-cols-4 md:w-full'
        list={categories}
        renderItem={(category) => <CategoryCard category={category} />}
      />
    </HomeSection>
  );
};

export default Categories;
