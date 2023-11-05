'use client';

import {useGetRecentPosts} from '@/lib/react-query/queries/post.query';
import {Models} from 'appwrite';
import React from 'react';
import PostCard from '../cards/PostCard';
import Loader from '../shared/atoms/Loader';
import Alert from '../shared/atoms/Alert';
import {ERROR_ALERT_PROPS} from '@/constants';

const RecentPosts = () => {
  const {data: posts, isPending: isPostLoading, isError: isPostError} = useGetRecentPosts();

  if (isPostError) return <Alert {...ERROR_ALERT_PROPS} />;

  return (
    <>
      {isPostLoading && !posts ? (
        <Loader otherClasses="w-[500px]" />
      ) : (
        <ul className="flex w-full flex-1 flex-col gap-9">
          {posts?.documents.map((post: Models.Document) => <PostCard key={post.$id} post={post} />)}
        </ul>
      )}
    </>
  );
};

export default RecentPosts;
