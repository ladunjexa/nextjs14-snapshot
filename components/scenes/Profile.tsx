'use client';

import Link from 'next/link';
import Image from 'next/image';

import {Button} from '@/components/ui/button';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import GridPostList from '@/components/shared/GridPostList';
import Loader from '@/components/shared/atoms/Loader';

import {
  useUpdateUserFollowers,
  useUpdateUserFollowing,
} from '@/lib/react-query/mutations/user.mutation';
import {useGetCurrentUser, useGetUserById} from '@/lib/react-query/queries/user.query';

type Props = {
  userId: string;
};

type StatBlockProps = {
  value: string | number;
  label: string;
  link?: string;
};

const StatBlock = ({value, label, link}: StatBlockProps) => {
  const renderValue = () => (
    <div className="flex-center gap-2">
      <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
      <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
  );

  return link ? <Link href={link}>{renderValue()}</Link> : renderValue();
};

const Profile = ({userId}: Props) => {
  const {data: currentUser} = useGetCurrentUser();

  const {data: viewedUser} = useGetUserById(userId);

  const {mutate: updateUserFollowers} = useUpdateUserFollowers();
  const {mutate: updateUserFollowing} = useUpdateUserFollowing();

  if (!viewedUser || !currentUser) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  const handleFollowUser = async () => {
    let newFollowers = [...viewedUser.followers];
    let newFollowing = [...currentUser.following];

    if (newFollowers.includes(currentUser.$id)) {
      newFollowers = newFollowers.filter(user => user !== currentUser.$id);
      newFollowing = newFollowing.filter(user => user !== viewedUser.$id);
    } else {
      newFollowers.push(currentUser.$id);
      newFollowing.push(viewedUser.$id);
    }

    updateUserFollowers({userId: viewedUser.$id, followers: newFollowers});
    updateUserFollowing({userId: currentUser.$id, following: newFollowing});
  };

  return (
    <div className="profile-container">
      <div className="profile-inner_container">
        <div className="flex flex-1 flex-col gap-7 max-xl:items-center xl:flex-row">
          <Image
            src={viewedUser.imageUrl || `/assets/icons/profile-placeholder.svg`}
            alt="profile"
            width={150}
            height={150}
            className="h-28 w-28 rounded-full lg:h-36 lg:w-36"
          />
          <div className="flex flex-1 flex-col justify-between text-center md:mt-2 xl:text-left">
            <div className="flex w-full flex-col">
              <h1 className="h3-bold md:h2-bold w-full ">{viewedUser.name}</h1>
              <p className="small-regular md:body-medium text-light-3">@{viewedUser.username}</p>
            </div>

            <div className="z-20 mt-10 flex flex-wrap items-center justify-center gap-8 xl:justify-start">
              <StatBlock value={viewedUser.posts.length} label="Posts" />
              <StatBlock
                value={viewedUser.followers.length}
                label="Followers"
                link={`/profile/${viewedUser.$id}/followers`}
              />
              <StatBlock
                value={viewedUser.following.length}
                label="Following"
                link={`/profile/${viewedUser.$id}/following`}
              />
            </div>

            <p className="small-medium md:base-medium mt-7 max-w-screen-sm">{viewedUser.bio}</p>
          </div>

          <div className="flex justify-center gap-4 md:mt-2">
            <div className={`${currentUser.$id !== viewedUser.$id && 'hidden'}`}>
              <Link
                href={`/edit-profile/${viewedUser.$id}`}
                className={`${currentUser.$id !== viewedUser.$id && 'hidden'}`}
              >
                <Button type="button" onClick={() => {}} className="shad-button_primary">
                  <Image
                    src="/assets/icons/edit.svg"
                    alt="edit"
                    width={20}
                    height={20}
                    className="invert-white"
                  />
                  <p className="small-medium flex whitespace-nowrap">Edit Profile</p>
                </Button>
              </Link>
            </div>

            <div className={`${currentUser.$id === userId && 'hidden'}`}>
              <Button type="button" onClick={handleFollowUser} className="shad-button_primary px-8">
                {isUserFollow(viewedUser.followers, currentUser.$id) ? 'Unfollow' : 'Follow'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentUser.$id === viewedUser.$id ? (
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
            <GridPostList posts={viewedUser.posts} showUser={false} />
          </TabsContent>
          <TabsContent value="likedPosts">
            <GridPostList posts={viewedUser.liked} showStats={false} showUser={false} />
          </TabsContent>
        </Tabs>
      ) : (
        <GridPostList posts={viewedUser.posts} showUser={false} />
      )}
    </div>
  );
};

const isUserFollow = (followList: string[], userId: string) => followList.includes(userId);

export default Profile;
