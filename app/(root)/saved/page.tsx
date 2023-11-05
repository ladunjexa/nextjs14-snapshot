import React from 'react';
import Image from 'next/image';

import SavedPosts from '@/components/scenes/SavedPosts';

export default function Page() {
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start w-full max-w-5xl justify-start gap-3">
          <Image
            src="/assets/icons/bookmark.svg"
            width={36}
            height={36}
            alt="add"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold w-full text-left">Saved Posts</h2>
        </div>

        <SavedPosts />
      </div>
    </div>
  );
}
