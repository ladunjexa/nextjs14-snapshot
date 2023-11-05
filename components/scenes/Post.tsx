'use client';

import {useUserContext} from '@/context/AuthContext';
import {useGetPostById} from '@/lib/react-query/queries/post.query';
import {getTimestamp} from '@/lib/utils';
import Image from 'next/image';
import React from 'react';
import PostStats from '../shared/PostStats';
import {Button} from '../ui/button';
import Link from 'next/link';
import {useDeletePost} from '@/lib/react-query/mutations/post.mutation';
import {useRouter} from 'next/navigation';

type Props = {
  postId: string;
};

const Post = ({postId}: Props) => {
  const router = useRouter();
  const {user} = useUserContext();
  const {data: post, isPending: isPostPending} = useGetPostById((postId as string) || '');

  const {mutate: deletePost} = useDeletePost();

  if (isPostPending) return <p>Loading...</p>;

  const handleDeletePost = () => {
    deletePost({postId, imageId: post?.imageId});
    router.back();
  };

  return (
    <div className="post_details-container">
      {isPostPending || !post ? (
        <p>Loading...</p>
      ) : (
        <div className="post_details-card">
          <Image
            src={post.imageUrl}
            width={500}
            height={500}
            alt="post"
            className="post_details-img"
          />
          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link href={`/profile/${post.creator.$id}`} className="flex items-center gap-3">
                <Image
                  src={post.creator.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt="creator"
                  width={50}
                  height={50}
                  className="h-8 w-8 rounded-full lg:h-12 lg:w-12"
                />

                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                  <div className="flex-center gap-2 text-light-3">
                    {post.$createdAt && (
                      <p className="subtle-semibold lg:small-regular">
                        {getTimestamp(post.$createdAt)}
                      </p>
                    )}
                    -<p className="subtle-semibold lg:small-regular">{post.location}</p>
                  </div>
                </div>
              </Link>

              <div className="flex-center">
                <Link
                  href={`/edit-post/${post.$id}`}
                  className={`${user.id !== post.creator.$id && 'hidden'}`}
                >
                  <Image src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>

                <Button
                  variant="ghost"
                  onClick={handleDeletePost}
                  className={`${user.id !== post.creator.$id && 'hidden'}`}
                >
                  <Image src="/assets/icons/delete.svg" alt="delete" width={24} height={24} />
                </Button>
              </div>
            </div>

            <hr className="w-full border border-dark-4/80" />

            <div className="small-medium lg:base-regular flex w-full flex-1 flex-col">
              <p>{post.caption}</p>
              <ul className="mt-2 flex flex-wrap gap-1">
                {post.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full">
              <PostStats post={post} userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;