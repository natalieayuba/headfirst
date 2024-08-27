import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

const useSyncSearchParams = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onUpdate = (key: string, value: any) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return { onUpdate };
};

export default useSyncSearchParams;
