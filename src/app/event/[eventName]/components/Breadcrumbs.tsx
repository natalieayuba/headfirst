import React from 'react';
import Icon from '../../../components/Icon';
import type { CategoryProps } from '@/db/schema';
import Link from 'next/link';

const Breadcrumbs = ({ category }: { category: CategoryProps }) => {
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
      name: category.name,
      url: `/whats-on?categoryId=${category.id}`,
    },
  ];

  return (
    <nav className='mb-5'>
      <ul className='content-container'>
        {breadcrumbs.map(({ name, url }, index) => (
          <li
            key={name}
            className={`inline-block font-medium ${
              index !== breadcrumbs.length - 1
                ? 'text-white text-opacity-60'
                : 'text-lilac'
            }`}
          >
            <Link href={url} className='default-hover'>
              {name}
            </Link>
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
