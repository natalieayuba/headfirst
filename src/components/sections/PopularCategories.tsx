import React from 'react';
import HomeSection from './HomeSection';
import { categories } from '../../data/data';
import Image from 'next/image';
import HorizontalScroll from '../HorizontalScroll';
import Link from 'next/link';
import { toUrl } from '@/utils/formatting';
import type { CategoryProps } from '../EventProps';

const PopularCategories = () => {
  const card = (item: CategoryProps) => (
    <Link
      href={`/whats-on?category=${toUrl(item.name)}`}
      // href={`/whats-on?categoryId=${toUrl(item.id)}`}
      className='block flex-shrink-0 w-[190px] aspect-[1.5] h-auto rounded-lg relative overflow-hidden'
    >
      <Image
        src={item.image}
        fill
        sizes='100%'
        className='object-cover'
        alt={`${item.name} background image`}
      />
      <div className='bg-gradient-to-b from-transparent to-dark-night to-[120%] w-full h-full absolute'></div>
      <h3 className='px-4 py-2 absolute bottom-0'>{item.name}</h3>
    </Link>
  );

  return (
    <HomeSection heading='Popular categories'>
      <HorizontalScroll list={categories} card={card} />
    </HomeSection>
  );
};

export default PopularCategories;
