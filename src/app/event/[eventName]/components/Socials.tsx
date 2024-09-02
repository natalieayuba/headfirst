import Icon from '@/app/components/Icon';
import type { SocialsProps } from '@/db/schema';
import { capitaliseFirstLetter } from '@/utils/formatting';
import Link from 'next/link';
import React from 'react';

const Socials = ({ socials }: { socials: SocialsProps }) => {
  return (
    <div className='flex gap-3'>
      {Object.keys(socials).map((social) => (
        <Link
          href={socials[social as keyof SocialsProps] ?? '#'}
          title={capitaliseFirstLetter(social)}
          className='hover:opacity-90 transition-opacity duration-200'
          target='_blank'
        >
          <Icon
            name={social}
            size={32}
            fill={social === 'instagram' ? 'none' : 'white'}
          />
        </Link>
      ))}
    </div>
  );
};

export default Socials;
