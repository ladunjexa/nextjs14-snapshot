'use client';

import {useSearchParams} from 'next/navigation';

import React, {useEffect} from 'react';
import GridPostList from '../GridPostList';
import {useGetPosts, useSearchPosts} from '@/lib/react-query/queries/post.query';
import useDebounce from '@/hooks/useDebounce';
import Loader from '../atoms/Loader';
import {useInView} from 'react-intersection-observer';

const LocalResult = () => {
  const searchParams = useSearchParams();
  const {ref, inView} = useInView();

  const query = searchParams.get('q');
  const debouncedValue = useDebounce(query?.toString() || '', 500);

  const {data: posts, fetchNextPage, hasNextPage} = useGetPosts();
  const {data: searchedPosts, isFetching: isSearchFetching} = useSearchPosts(debouncedValue);

  useEffect(() => {
    if (inView && !query) fetchNextPage();
  }, [inView, query, fetchNextPage]);

  if (!posts || isSearchFetching) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }
  const shouldShowSearchResults = query !== undefined && query !== null;
  const shouldShowPosts =
    !shouldShowSearchResults && posts?.pages.every((item: any) => item.documents.length === 0);

  return (
    <>
      <div className="flex w-full max-w-5xl flex-wrap gap-9">
        {shouldShowSearchResults ? (
          searchedPosts && searchedPosts.documents.length > 0 ? (
            <GridPostList posts={searchedPosts.documents} />
          ) : (
            <p className="mt-10 w-full text-center text-light-4">No results</p>
          )
        ) : shouldShowPosts ? (
          <p className="mt-10 w-full text-center text-light-4">End of posts</p>
        ) : (
          posts.pages.map((item: any, index) => (
            <GridPostList key={`page-${index}`} posts={item.documents} />
          ))
        )}
      </div>

      {hasNextPage && !query && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </>
  );
};

export default LocalResult;
