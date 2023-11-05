import React from 'react';
import Image from 'next/image';

import LocalSearchbar from '@/components/shared/search/LocalSearchbar';
import LocalResult from '@/components/shared/search/LocalResult';
interface SearchParamsProps {
  searchParams: {[key: string]: string | undefined};
}

export default function Page({searchParams}: SearchParamsProps) {
  return (
    <div className="explore-container">
      <div className="explore-inner_container">
        <h2 className="h3-bold md:h2-bold">Search Posts</h2>

        <LocalSearchbar route="/explore" placeholder="Seach for posts" />
      </div>

      <div className="flex-between mb-7 mt-16 w-full max-w-5xl">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>

        <div className="flex-center cursor-pointer gap-3 rounded-xl bg-dark-3 px-4 py-2">
          <p className="small-medium md:base-medium text-light-2">All</p>
          <Image src="/assets/icons/filter.svg" width={20} height={20} alt="filter" />
        </div>
      </div>

      <LocalResult />
    </div>
  );
}