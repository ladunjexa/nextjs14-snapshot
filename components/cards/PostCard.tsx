import Link from 'next/link';
import Image from 'next/image';

import {useUserContext} from '@/context/AuthContext';

import PostStats from '@/components/shared/PostStats';

import {getLocaleDate} from '@/lib/utils';

import type {Models} from 'appwrite';

type Props = {
  post: Models.Document;
};

const PostCard = ({post}: Props) => {
  const {user} = useUserContext();

  if (!post.creator) return null;

  return (
    <div className="post-card">
      <div className="flex-between">
        <div className="flex items-center gap-3">
          <Link href={`/profile/${post.creator.$id}`}>
            <Image
              src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
              alt="creator"
              width={50}
              height={50}
              className="w-12 rounded-full lg:h-12"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular">{getLocaleDate(post.$createdAt)}</p>-
              <p className="subtle-semibold lg:small-regular">{post.location}</p>
            </div>
          </div>
        </div>

        <Link
          href={`/edit-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && 'hidden'}`}
        >
          <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </Link>
      </div>

      <Link href={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="mt-2 flex flex-wrap gap-1">
            {post.tags.map((tag: string) => (
              <li key={tag} className="text-light-3">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <Image
          src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
          alt="post image"
          width={500}
          height={500}
          className="post-card_img"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </div>
  );
};

export default PostCard;
