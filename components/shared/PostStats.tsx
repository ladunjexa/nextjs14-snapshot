'use client';

import React, {useState, useEffect} from 'react';
import Image from 'next/image';

import Loader from '@/components/shared/atoms/Loader';

import {useDeleteSavedPost, useSavePost} from '@/lib/react-query/mutations/save.mutation';
import {useLikePost} from '@/lib/react-query/mutations/post.mutation';
import {useGetCurrentUser} from '@/lib/react-query/queries/user.query';

import type {Models} from 'appwrite';

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

type PostStatsIconProps = {
  icon: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const PostStatsIcon = ({icon, onClick}: PostStatsIconProps) => (
  <Image
    src={`/assets/icons/${icon}.svg`}
    alt={icon}
    width={20}
    height={20}
    onClick={onClick}
    className="cursor-pointer"
  />
);

const PostStats = ({post, userId}: PostStatsProps) => {
  const likesList = post.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const {data: currentUser} = useGetCurrentUser();

  const {mutate: likePost} = useLikePost();
  const {mutate: savePost, isPending: isSavingPost} = useSavePost();
  const {mutate: deleteSavedPost, isPending: isDeletingSavedPost} = useDeleteSavedPost();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => setIsSaved(!!savedPostRecord), [currentUser, savedPostRecord]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    if (isUserLiked(newLikes, userId)) {
      newLikes = newLikes.filter(user => user !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({postId: post.$id, likes: newLikes});
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({postId: post.$id, userId});
      setIsSaved(true);
    }
  };

  return (
    <div className="z-20 flex items-center justify-between">
      <div className="mr-5 flex gap-2">
        <PostStatsIcon
          icon={isUserLiked(likes, userId) ? 'liked' : 'like'}
          onClick={handleLikePost}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2">
        {isSavingPost || isDeletingSavedPost ? (
          <Loader />
        ) : (
          <PostStatsIcon icon={isSaved ? 'saved' : 'save'} onClick={handleSavePost} />
        )}
      </div>
    </div>
  );
};

const isUserLiked = (likeList: string[], userId: string) => likeList.includes(userId);

export default PostStats;
