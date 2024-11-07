'use client';
import NextLink from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Suspense, type MouseEvent } from 'react';
import useLoader from '@/hooks/useLoader';
import Loader from './Loader';

interface LinkProps {
  onSelect?: () => void;
}

const Link = ({
  href,
  children,
  replace,
  onClick,
  onSelect,
  ...rest
}: LinkProps & Parameters<typeof NextLink>[0]) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleClick = (e: MouseEvent) => {
    if (onClick) {
      onClick(e as MouseEvent<HTMLAnchorElement>);
    }
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
      <Suspense>
        <NextLink
          href={href}
          onClick={(e) => loadPage(handleClick, afterClick, e)}
          {...rest}
        >
          {children}
        </NextLink>
      </Suspense>
    </>
  );
};

export default Link;
