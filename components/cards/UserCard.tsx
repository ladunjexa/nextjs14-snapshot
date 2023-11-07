import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {Button} from '@/components/ui/button';
import Loader from '@/components/shared/atoms/Loader';

import {
  useUpdateUserFollowers,
  useUpdateUserFollowing,
} from '@/lib/react-query/mutations/user.mutation';
import {useGetCurrentUser} from '@/lib/react-query/queries/user.query';

import type {Models} from 'appwrite';

type Props = {
  user: Models.Document;
};

const UserCard = ({user}: Props) => {
  const {data: currentUser} = useGetCurrentUser();

  const {mutate: updateUserFollowers} = useUpdateUserFollowers();
  const {mutate: updateUserFollowing} = useUpdateUserFollowing();

  if (!currentUser) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  const handleFollowUser = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let newFollowers = [...user.followers];
    let newFollowing = [...currentUser.following];

    if (newFollowers.includes(currentUser.$id) && newFollowing.includes(user.$id)) {
      newFollowers = newFollowers.filter(user => user !== currentUser.$id);
      newFollowing = newFollowing.filter(user => user !== user.$id);
    } else {
      newFollowers.push(currentUser.$id);
      newFollowing.push(user.$id);
    }

    updateUserFollowers({userId: user.$id, followers: newFollowers});
    updateUserFollowing({userId: currentUser.$id, following: newFollowing});
  };

  return (
    <Link href={`/profile/${user.$id}`} className="user-card">
      <Image
        src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
        alt="profile"
        width={24}
        height={24}
        className="h-14 w-14 rounded-full"
      />

      <div className="flex-center flex-col gap-1">
        <p className="base-medium line-clamp-1 text-center text-light-1">{user.name}</p>
        <p className="small-regular line-clamp-1 text-center text-light-3">@{user.username}</p>
      </div>

      <Button
        type="button"
        size="sm"
        onClick={handleFollowUser}
        className="shad-button_primary px-5"
      >
        {isUserFollow(user.followers, currentUser.$id) ? 'Unfollow' : 'Follow'}
      </Button>
    </Link>
  );
};

const isUserFollow = (followList: string[], userId: string) => followList.includes(userId);

export default UserCard;
