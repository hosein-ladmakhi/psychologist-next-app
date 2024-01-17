'use client';

import {
  useSearchParams as useNextSearchParams,
  usePathname,
  useRouter,
} from 'next/navigation';

export const useSearchParams = () => {
  const searchParams = useNextSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onChange = (key: string, value: string) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    urlSearchParams.set(key, value);
    router.push(pathname + '?' + urlSearchParams);
  };

  return onChange;
};
