'use client';

import {useRouter} from 'next/navigation';
import React from 'react';
import {Button} from '../ui/button';
import Image from 'next/image';
import {useGetUserById} from '@/lib/react-query/queries/user.query';
import Loader from '../shared/atoms/Loader';

type Props = {
  followerId: string;
};

const FollowCard = ({followerId}: Props) => {
  const router = useRouter();

  const {data: user, isPending: isUserPending} = useGetUserById(followerId);

  if (isUserPending || !user) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <article className="follow-card w-full">
      <div className="follow-card_avatar">
        <div className="relative h-12 w-12">
          <Image
            src={user.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="user profile image"
            fill
            className="rounded-full object-cover"
          />
        </div>

        <div className="flex-1 text-ellipsis">
          <h4 className="base-medium line-clamp-1 text-light-1">{user.name}</h4>
          <p className="small-regular line-clamp-1 text-light-3">@{user.username}</p>
        </div>
      </div>

      <Button className="follow-card_btn" onClick={() => router.push(`/profile/${user.$id}`)}>
        View
      </Button>
    </article>
  );
};

export default FollowCard;
