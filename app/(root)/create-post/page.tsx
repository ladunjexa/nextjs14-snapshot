import React from 'react';
import Image from 'next/image';

import Post from '@/components/forms/Post';

export default function Page() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <Image src="/assets/icons/add-post.svg" width={36} height={36} alt="add" />
          <h2 className="h3-bold md:h2-bold w-full text-left">Create Post</h2>
        </div>

        <Post />
      </div>
    </div>
  );
}
