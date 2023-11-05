'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {Input} from '@/components/ui/input';

import {formUrlQuery, removeKeysFromQuery} from '@/lib/utils';

type Props = {
  route: string;
  placeholder: string;
  otherClasses?: string;
};

const LocalSearchbar = ({route, placeholder, otherClasses}: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = searchParams.get('q');

  const [search, setSearch] = useState(query || '');

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: 'q',
          value: search,
        });

        router.push(newUrl, {scroll: false});
      } else {
        if (pathname === route) {
          const newUrl = removeKeysFromQuery({
            params: searchParams.toString(),
            keysToRemove: ['q'],
          });

          router.push(newUrl, {scroll: false});
        }
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [search, route, pathname, router, searchParams, query]);

  return (
    <div className={`flex w-full gap-1 rounded-lg bg-dark-4 px-4 ${otherClasses}`}>
      <Image src="/assets/icons/search.svg" width={24} height={24} alt="search" />
      <Input
        type="text"
        placeholder={placeholder}
        className="explore-search"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
    </div>
  );
};

export default LocalSearchbar;
