import Link from 'next/link';
import Image from 'next/image';

import {Button} from '@/components/ui/button';

import type {Models} from 'appwrite';

type Props = {
  user: Models.Document;
};

const UserCard = ({user}: Props) => {
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

      <Button type="button" size="sm" className="shad-button_primary px-5">
        Follow
      </Button>
    </Link>
  );
};

export default UserCard;
