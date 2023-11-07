'use client';

import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/atoms/Loader';
import Alert from '@/components/shared/atoms/Alert';

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
            <Alert
              title="No Saved Posts"
              description="It appears that there are no saved posts in your collection at the moment 😔. Start exploring and saving posts that pique your interest 🌟"
              link="/"
              linkTitle="Explore Posts"
              imgSrc="/assets/icons/bookmark.svg"
            />
          ) : (
            <GridPostList posts={savedPosts} showStats={false} />
          )}
        </ul>
      )}
    </>
  );
};

export default SavedPosts;
