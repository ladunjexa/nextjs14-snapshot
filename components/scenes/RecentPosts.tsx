'use client';

import {useGetRecentPosts} from '@/lib/react-query/queries/post.query';
import {Models} from 'appwrite';
import React from 'react';
import PostCard from '../cards/PostCard';
import Loader from '../shared/atoms/Loader';

const RecentPosts = () => {
  const {data: posts, isPending: isPostLoading, isError: isPostError} = useGetRecentPosts();

  if (isPostError) {
    return <p>Error..</p>;
  }

  return (
    <>
      {isPostLoading && !posts ? (
        <Loader />
      ) : (
        <ul className="flex w-full flex-1 flex-col gap-9">
          {posts?.documents.map((post: Models.Document) => <PostCard key={post.$id} post={post} />)}
        </ul>
      )}
    </>
  );
};

export default RecentPosts;
