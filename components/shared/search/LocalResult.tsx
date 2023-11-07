'use client';

import {useEffect} from 'react';
import {useSearchParams} from 'next/navigation';
import {useInView} from 'react-intersection-observer';

import useDebounce from '@/hooks/useDebounce';

import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/atoms/Loader';
import Alert from '@/components/shared/atoms/Alert';

import {useGetPosts, useSearchPosts} from '@/lib/react-query/queries/post.query';

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
            <Alert
              title="No Posts Found"
              description="It appears that there are no posts matching your search query 😔. Try searching for something else 💡"
              link="/"
              linkTitle="Explore Posts"
              imgSrc="/assets/icons/search-colored.svg"
            />
          )
        ) : shouldShowPosts ? (
          <Alert
            title="No Posts Found"
            description="Be the first to break the silence! 🚀 Share a Post and kickstart the
          network. Get
          involved! 💡."
            link="/create-post"
            linkTitle="Create a Post"
            imgSrc="/assets/icons/bookmark.svg"
          />
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
