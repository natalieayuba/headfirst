'use client';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import useLoader from '@/hooks/useLoader';
import Loader from './Loader';

interface LinkProps {
  onSelect?: () => void;
}

const Link = ({
  href,
  children,
  replace,
  onSelect,
  ...rest
}: LinkProps & Parameters<typeof NextLink>[0]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onClick = () => {
    const url = href.toString();
    if (pathname !== url && `${pathname}?${searchParams}` !== url) {
      if (replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    }
  };

  const afterClick = () => {
    if (onSelect) {
      onSelect();
    }
  };

  const { loading, loadPage } = useLoader();

  return (
    <>
      {loading && <Loader />}
      <NextLink
        href={href}
        onClick={(e) => loadPage(onClick, afterClick, e)}
        {...rest}
      >
        {children}
      </NextLink>
    </>
  );
};

export default Link;
