'use client';

import Link from 'next/link';
import Image from 'next/image';

import {useUserContext} from '@/context/AuthContext';

import PostStats from '@/components/shared/PostStats';

import type {Models} from 'appwrite';

type Props = {
  posts: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({posts, showUser = true, showStats = true}: Props) => {
  const {user} = useUserContext();

  return (
    <>
      {posts && (
        <ul className="grid-container">
          {posts.map(post => (
            <li key={post.$id} className="relative h-auto w-auto">
              <Link href={`/posts/${post.$id}`} className="grid-post_link">
                <Image
                  src={post.imageUrl}
                  alt="post"
                  width={500}
                  height={500}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="grid-post_user">
                {showUser && (
                  <div className="flex flex-1 items-center justify-start gap-2">
                    <Image
                      src={post.creator.imageUrl}
                      alt="user"
                      width={24}
                      height={24}
                      className="h-8 w-8 rounded-full"
                    />
                    <p className="line-clamp-1">{post.creator.name}</p>
                  </div>
                )}

                {showStats && <PostStats post={post} userId={user.id} />}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default GridPostList;
