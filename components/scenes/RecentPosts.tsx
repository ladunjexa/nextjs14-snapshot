'use client';

import {useGetRecentPosts} from '@/lib/react-query/queries/post.query';
import {Models} from 'appwrite';
import React from 'react';

const RecentPosts = () => {
  const {data: posts, isPending: isPostLoading, isError: isPostError} = useGetRecentPosts();

  if (isPostError) {
    return <p>Error..</p>;
  }

  return (
    <>
      {isPostLoading && !posts ? (
        <p>Loading..</p>
      ) : (
        <ul className="flex w-full flex-1 flex-col gap-9">
          {posts?.documents.map((post: Models.Document) => <p key={post.$id}>{post.$id}</p>)}
        </ul>
      )}
    </>
  );
};

export default RecentPosts;
