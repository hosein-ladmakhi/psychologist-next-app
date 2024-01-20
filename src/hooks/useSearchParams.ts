'use client';

import {
  useSearchParams as useNextSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';
import { useCallback } from 'react';

export const useSearchParams = () => {
  const searchParams = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChangeSearchParams = useCallback(
    (key: string, value: string | undefined) => {
      const urlSearchParams = new URLSearchParams(searchParams);
      if (value) urlSearchParams.set(key, value);
      else urlSearchParams.delete(key);
      router.push(pathname + '?' + urlSearchParams);
    },
    [searchParams],
  );

  const onChangeMultipleSearchParams = useCallback(
    <T extends Object>(queries: T) => {
      const urlSearchParams = new URLSearchParams(searchParams);
      Object.entries(queries).map(([queryKey, queryValue]) => {
        if (queryValue) urlSearchParams.set(queryKey, queryValue);
        else urlSearchParams.delete(queryKey);
      });
      router.push(pathname + '?' + urlSearchParams);
    },
    [searchParams],
  );

  const getSearchParams = (key: string) => {
    return searchParams.get(key);
  };

  const onDeleteSearchParams = useCallback(
    (key: string) => {
      if (searchParams.has(key)) {
        const urlSearchParams = new URLSearchParams(searchParams);
        urlSearchParams.delete(key);
        router.push(pathname + '?' + urlSearchParams);
      }
    },
    [searchParams],
  );

  return {
    onChangeSearchParams,
    getSearchParams,
    onDeleteSearchParams,
    onChangeMultipleSearchParams,
  };
};
