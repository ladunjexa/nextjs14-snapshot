'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {useUserContext} from '@/context/AuthContext';

import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import GridPostList from '@/components/shared/GridPostList';

import {useGetUserById} from '@/lib/react-query/queries/user.query';
import Loader from '@/components/shared/atoms/Loader';

type Props = {
  userId: string;
};

type StatBlockProps = {
  value: string | number;
  label: string;
};

const StatBlock = ({value, label}: StatBlockProps) => {
  return (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );
};

const Profile = ({userId}: Props) => {
  const {user} = useUserContext();

  const {data: currentUser} = useGetUserById(userId);

  if (!currentUser) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-1 flex-col gap-7 max-xl:items-center xl:flex-row">
          <Image
            src={currentUser.imageUrl || `/assets/icons/profile-placeholder.svg`}
            alt="profile"
            width={150}
            height={150}
            className="h-28 w-28 rounded-full lg:h-36 lg:w-36"
          />
          <div className="flex flex-1 flex-col justify-between text-center md:mt-2 xl:text-left">
            <div className="flex w-full flex-col">
              <h1 className="h3-bold md:h1-semibold w-full ">{currentUser.name}</h1>
              <p className="small-regular md:body-medium text-light-3">@{currentUser.username}</p>
            </div>

            <div className="z-20 mt-10 flex flex-wrap items-center justify-center gap-8 xl:justify-start">
              <StatBlock value={currentUser.posts.length} label="Posts" />
              <StatBlock value={currentUser.followers.length} label="Followers" />
              <StatBlock value={currentUser.following.length} label="Following" />
            </div>

            <p className="small-medium md:base-medium mt-7 max-w-screen-sm">{currentUser.bio}</p>
          </div>

          <div className="flex justify-center gap-4">
            <div className={`${user.id !== currentUser.$id && 'hidden'}`}>
              <Link
                href={`/edit-profile/${currentUser.$id}`}
                className={`flex-center h-12 gap-2 rounded-lg bg-dark-4 px-5 text-light-1 ${
                  user.id !== currentUser.$id && 'hidden'
                }`}
              >
                <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                <p className="small-medium flex whitespace-nowrap">Edit Profile</p>
              </Link>
            </div>

            <div className={`${user.id === userId && 'hidden'}`}>
              <Button type="button" onClick={() => {}} className="shad-button_primary px-8">
                Follow
              </Button>
            </div>
          </div>
        </div>
      </div>

      {user.id === currentUser.$id ? (
        <Tabs defaultValue="posts" className="w-full max-w-5xl">
          <TabsList className="mb-5 flex justify-start">
            <TabsTrigger value="posts" className="profile-tab rounded-l-lg">
              {' '}
              <Image src={'/assets/icons/posts.svg'} alt="posts" width={20} height={20} />
              Posts
            </TabsTrigger>
            <TabsTrigger value="likedPosts" className="profile-tab rounded-r-lg">
              {' '}
              <Image src={'/assets/icons/like.svg'} alt="like" width={20} height={20} />
              Liked Posts
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <GridPostList posts={currentUser.posts} showUser={false} />
          </TabsContent>
          <TabsContent value="likedPosts">
            <GridPostList posts={currentUser.liked} showStats={false} showUser={false} />
          </TabsContent>
        </Tabs>
      ) : (
        <GridPostList posts={currentUser.posts} showUser={false} />
      )}
    </div>
  );
};

export default Profile;
