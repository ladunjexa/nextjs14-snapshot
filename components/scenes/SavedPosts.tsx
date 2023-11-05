'use client';

import React from 'react';

import GridPostList from '@/components/shared/GridPostList';
import Loader from '../shared/atoms/Loader';
import {useGetCurrentUser} from '@/lib/react-query/queries/user.query';

import type {Models} from 'appwrite';

type Props = {};

const SavedPosts = (props: Props) => {
  const {data: currentUser} = useGetCurrentUser();

  const savedPosts = currentUser?.save.map((savePost: Models.Document) => ({
    ...savePost.post,
    creator: {
      imageUrl: currentUser.imageUrl,
    },
  }));

  return (
    <>
      {!currentUser ? (
        <Loader />
      ) : (
        <ul className="flex w-full max-w-5xl flex-wrap gap-9">
          {savedPosts.length === 0 ? (
            <p className="text-light-4">No available posts</p>
          ) : (
            <GridPostList posts={savedPosts} showStats={false} />
          )}
        </ul>
      )}
    </>
  );
};

export default SavedPosts;
