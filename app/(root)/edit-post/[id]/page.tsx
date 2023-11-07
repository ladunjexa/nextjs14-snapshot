import Image from 'next/image';

import Post from '@/components/forms/Post';

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
          <h2 className="h3-bold md:h2-bold w-full text-left">Edit Post</h2>
        </div>

        <Post action="Update" postId={params.id} />
      </div>
    </div>
  );
}
