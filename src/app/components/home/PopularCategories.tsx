import React from 'react';
import HomeSection from './HomeSection';
import Image from 'next/image';
import HorizontalScroll from '../HorizontalScroll';
import Link from 'next/link';
import type { CategoryProps } from '@/data/data';
import { getCategories } from '@/utils/db';

const CategoryCard = ({ category }: { category: CategoryProps }) => (
  <Link
    href={`/whats-on?categoryId=${category.id}`}
    className='block flex-shrink-0 w-[190px] aspect-[1.5] h-auto rounded-lg relative overflow-hidden'
  >
    <Image
      src={category.image}
      fill
      sizes='100%'
      className='object-cover'
      alt={`${category.name} background image`}
    />
    <div className='bg-gradient-to-b from-transparent to-dark-night to-[120%] w-full h-full absolute'></div>
    <h3 className='px-4 py-2 absolute bottom-0'>{category.name}</h3>
  </Link>
);

const PopularCategories = async () => {
  const categories = await getCategories();
  return (
    <HomeSection heading='Popular categories'>
      <HorizontalScroll
        list={categories}
        card={(category) => <CategoryCard category={category} />}
      />
    </HomeSection>
  );
};

export default PopularCategories;
