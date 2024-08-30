'use client';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import React, { startTransition, useState } from 'react';
import Loader from './Loader';

const Link = ({
  href,
  children,
  replace,
  ...rest
}: Parameters<typeof NextLink>[0]) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <Loader />}
      <NextLink
        href={href}
        onClick={(e) => {
          setLoading(true);
          startTransition(() => {
            e.preventDefault();
            setTimeout(function () {
              const url = href.toString();
              if (replace) {
                router.replace(url);
              } else {
                router.push(url);
              }
              setTimeout(function () {
                setLoading(false);
              }, 300);
            }, 300);
          });
        }}
        {...rest}
      >
        {children}
      </NextLink>
    </>
  );
};

export default Link;
