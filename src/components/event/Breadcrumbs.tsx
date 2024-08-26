import { getCategoryById } from '@/data/utils';
import Link from 'next/link';
import React from 'react';
import Icon from '../Icon';

const Breadcrumbs = ({ categoryId }: { categoryId: string }) => {
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
      name: getCategoryById(categoryId)?.name,
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
                ? 'text-white-alpha-60'
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
