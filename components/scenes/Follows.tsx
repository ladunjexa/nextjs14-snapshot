'use client';

import Image from 'next/image';

import FollowCard from '@/components/cards/FollowCard';
import Loader from '@/components/shared/atoms/Loader';
import Alert from '@/components/shared/atoms/Alert';

import {useGetUserById} from '@/lib/react-query/queries/user.query';

type Props = {
  type: 'Followers' | 'Following';
  viewedId: string;
};

const Follows = ({type, viewedId}: Props) => {
  const {data: viewedUser, isPending: isUserPending} = useGetUserById(viewedId);

  if (isUserPending || !viewedUser) {
    return (
      <div className="flex-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <Image
            src="/assets/icons/people.svg"
            width={36}
            height={36}
            alt="follow"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">
            <span className="text-primary-500">@{viewedUser.username}&apos;s</span> {type}
          </h2>
        </div>
        {viewedUser[type.toLowerCase()].length === 0 ? (
          <Alert
            title={`No ${type}`}
            description={`It appears that ${viewedUser.name} have no ${type.toLowerCase()} 😔`}
            link="/"
            linkTitle="Explore Posts"
            imgSrc="/assets/icons/people.svg"
          />
        ) : (
          <>
            {viewedUser[type.toLowerCase()].map((follower: string) => (
              <FollowCard key={follower} followerId={follower} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Follows;
