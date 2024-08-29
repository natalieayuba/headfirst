import Link from 'next/link';
import React from 'react';
import Icon from '../../../components/Icon';
import type { CategoryProps } from '@/data/data';

interface BreadcrumbsProps {
  categoryId: string;
  categories: CategoryProps[];
}
const Breadcrumbs = ({ categoryId, categories }: BreadcrumbsProps) => {
  const breadcrumbs = [
    {
      name: 'Home',
      url: '/',
    },
    {
      name: 'Events',
      url: '/whats-on',
    },
    {
      name: categories.find(({ id }) => id === categoryId)?.name,
      url: `/whats-on?categoryId=${categoryId}`,
    },
  ];

  return (
    <nav>
      <ul className='pt-1 px-6'>
        {breadcrumbs.map(({ name, url }, index) => (
          <li
            key={name}
            className={`inline-block font-medium ${
              index !== breadcrumbs.length - 1
                ? 'text-white text-opacity-60'
                : 'text-lilac'
            }`}
          >
            <Link href={url}>{name}</Link>
            {index !== breadcrumbs.length - 1 && (
              <Icon
                size={12}
                name='angle-right'
                className='inline-block mx-2'
              />
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
