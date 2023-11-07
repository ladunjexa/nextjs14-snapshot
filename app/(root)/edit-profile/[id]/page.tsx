import Image from 'next/image';

import Profile from '@/components/forms/Profile';

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Edit Post — SnapShot',
};

type Props = {
  params: {id: string};
};

export default function Page({params}: Props) {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <Image src="/assets/icons/add-post.svg" width={36} height={36} alt="add" />
          <h2 className="h3-bold md:h2-bold w-full text-left">Edit Profile</h2>
        </div>
        <Profile userId={params.id} />
      </div>
    </div>
  );
}
